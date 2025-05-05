'use server'

import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from "./schemas"
import db from './db';
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";


const getAuthUser = async() => {
    const user = await currentUser()
    if(!user) throw new Error('You must be logged in to access this route')

    if(!user.privateMetadata.hasProfile) redirect('/profile/create')
    return user

}


const renderError = (error: unknown): {message: string} => {
    return {
        message: error instanceof Error ? error.message : 'An error ocurred'
    }
}

export const createProfileAction = async (prevState:any,formData : FormData) => {
    const user = await currentUser()
    if(!user) throw new Error('Pleaselogin to create profile')
    try {
        const rawData = Object.fromEntries(formData)
        const validatedfields = validateWithZodSchema(profileSchema,rawData);
        
        await db.profile.create({
            data:{
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedfields
            }
        })

        //to connect my profile with the clerk profile
        await clerkClient.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true
            }
        })

        
    }catch(error){
       return renderError(error)
    }

    redirect('/')
}


export const fetchProfileIcon = async () => {
    const user = await currentUser();
    if(!user) return null

    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        },
        select: {
            profileImage: true
        }
    })


    return profile?.profileImage;
}



export const fetchProfile = async () => {
    const user = await getAuthUser();

    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        }
    })


    if(!profile) redirect('/profile/create')

    return profile
}


export const updateProfileAction = async(prevState:any, formData: FormData) :Promise<{message: string}> => {
    const user = await getAuthUser();
    try{
        const rawData = Object.fromEntries(formData)
       /*  const validatedfields = profileSchema.parse(rawData); */
        const validatedfields = validateWithZodSchema(profileSchema,rawData);

        await db.profile.update({
            where: {
                clerkId: user.id,
            },
            data: validatedfields
        })

        revalidatePath('/profile')
        return {
            message: 'Profile updated successfully'
        }
    }catch(error){
        return renderError(error)
    }

}


export const updateProfileImageAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {

    const user = await getAuthUser();

    try {
        const image = formData.get('image') as File;
        const validatedfields = validateWithZodSchema(imageSchema, {image});
        const fullPath = await uploadImage(validatedfields.image);

        await db.profile.update({
            where: {
                clerkId: user.id
            },
            data: {
                profileImage: fullPath
            }
        })
        revalidatePath('/profile')
        return { message: 'Profile image updated successfully' };
        
    } catch (error) {
        return renderError(error)
    }

  };


  export const createPropertyAction = async (  prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();

    try {
        const rawData = Object.fromEntries(formData);
        const file = formData.get('image') as File;
        const validatedfields = validateWithZodSchema(propertySchema, rawData);
        const validatedFile= validateWithZodSchema(imageSchema,{image: file})
        const fullPath = await uploadImage(validatedFile.image)

        await db.property.create({
            data: {
                ...validatedfields,
                image: fullPath,
                profileId: user.id
            }
        })
        
    } catch (error) {
        console.log(error)
        return renderError(error)
    }

    redirect('/')
  }


  export const fetchProperties = async({search ='', category} : {search?: string, category?:string}) => {
    const properties = await db.property.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            tagline:true,
            country:true,
            price:true
        },
        where: {
            category, //initially cetagory will be undefined and grab all of the properties
            OR: [
                {name: {contains: search, mode: 'insensitive'}},
                {tagline: {contains: search, mode: 'insensitive'}},
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return properties

  }


  export const fetchFavouriteId = async({propertyId} : {propertyId: string}) => {
    const user = await getAuthUser();
    const favorite = await db.favorite.findFirst({
        where: {
            profileId: user.id,
            propertyId
        },
        select: {
            id:true
        }
    })

    return favorite?.id || null
  }


  export const toggleFavoriteAction = async (prevState: {
    propertyId: string;
    favoriteId: string | null;
    pathname: string
  }) => {
    const user = await getAuthUser()
    const {favoriteId ,propertyId, pathname} = prevState;

    try {
        if(favoriteId){
            await db.favorite.delete({
                where: {
                    id: favoriteId
                }
            })
        }else{
            await db.favorite.create({
                data: {
                    propertyId,
                    profileId:user.id
                }
            })
        }


        revalidatePath(pathname);
        return {
            message: favoriteId ? 'Removed from Faves' : 'Added to Faves'
        }  
        
    } catch (error) {
        return renderError(error)
    }
  }


  export const fetchFavorites = async() => {
    const user = await getAuthUser();

    const favorites = await db.favorite.findMany({
        where: {
            profileId: user.id
        },
        select:{
            property: {
                select:{
                    id: true,
                    name: true,
                    image: true,
                    tagline:true,
                    country:true,
                    price:true
                }
            }
        }
    })

    return favorites.map((favorite) => favorite.property)
  }


  export const fetchPropertyDetails = (id:string) => {
    return db.property.findUnique({
        where: {
            id
        },
        include: {
            profile: true
        }
    })
  }
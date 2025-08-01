import Image from 'next/image';

type UserInfoProps = {
  profile: {
    profileImage: string;
    firstName: string;
  };
};



const UserInfo = ({profile: {profileImage, firstName}} : UserInfoProps) => {
  return (
    <article className='grid grid-cols-[auto,1fr] gap-4 mt-4'>
        <Image
            src={profileImage}
            alt={firstName}
            className='object-cover rounded-w-12 h-12'
            width={50}
            height={50}
        />
        <div>
            <p>Hosted by <span className='font-bold'> {firstName} </span></p>
            <p className='text-muted-foreground font-light'> Superhost &middot; 2 years hosting </p>
        </div>
    </article>
  )
}

export default UserInfo
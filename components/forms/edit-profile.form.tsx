import { useForm } from 'react-hook-form'
import { EditProfileFormSchema, User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { editProfileFormSchema } from '@/lib/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { updateProfile } from '@/actions/user.action'
import { Loader } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { appwriteConfig, storage } from '@/lib/appwrite'
import { ID } from 'appwrite'
import { Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

interface EditProfileFormProps {
  currentUser: User
}

export default function EditProfileForm({ currentUser }: EditProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarImage, setAvatarImage] = useState({
    fileId: currentUser?.avatarId,
    url: currentUser?.avatar,
  })

  const [coverImage, setCoverImage] = useState({
    fileId: currentUser?.coverImageId,
    url: currentUser?.coverImage,
  })

  const editProfileForm = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      fullName: currentUser.fullName,
      phoneNumber: currentUser.phoneNumber || '',
      facebook: currentUser.facebook || '',
      address: currentUser.address || '',
      telegram: currentUser.telegram || '',
      instagram: currentUser.instagram || '',
    },
  })

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const file = e.target.files[0]

    try {
      const uploadedFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), file)
      const imageUrl = storage.getFileView(appwriteConfig.bucketId, uploadedFile.$id)

      if (e.target.id === 'avatarInput') {
        await updateProfile({ ...currentUser, avatar: imageUrl, avatarId: uploadedFile.$id })
        setAvatarImage({ fileId: uploadedFile.$id, url: imageUrl })
        location.reload()
      }

      if (e.target.id === 'coverInput') {
        await updateProfile({
          ...currentUser,
          coverImage: imageUrl,
          coverImageId: uploadedFile.$id,
        })
        setCoverImage({ fileId: uploadedFile.$id, url: imageUrl })
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const onDeleteImage = async (targetId: 'avatarInput' | 'coverInput', fileId: string) => {
    try {
      await storage.deleteFile(appwriteConfig.bucketId, fileId)

      if (targetId === 'avatarInput') {
        setAvatarImage({ fileId: '', url: '' })
        await updateProfile({ ...currentUser, avatar: '', avatarId: '' })
        location.reload()
      }

      if (targetId === 'coverInput') {
        setCoverImage({ fileId: '', url: '' })
        await updateProfile({ ...currentUser, coverImage: '', coverImageId: '' })
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const onEditProfileFormSubmit = (values: EditProfileFormSchema) => {
    const { fullName, address, phoneNumber, facebook, telegram, instagram } = values

    setIsSubmitting(true)

    updateProfile({
      ...currentUser,
      fullName,
      address,
      phoneNumber,
      facebook,
      telegram,
      instagram,
    })
      .then(({ status, message }) => {
        if (status === 200) {
          toast.success(message)
          location.reload()
        } else {
          toast.error(message)
        }
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <>
      <div className='relative w-full h-40 md:h-60 rounded-[1rem] mb-20 md:mb-32'>
        <Image
          src={coverImage.url || '/images/cover-placeholder.png'}
          alt='Profile placeholder'
          fill
          className='object-cover rounded-[1rem]'
        />
        {coverImage.fileId ? (
          <Button
            size={'icon'}
            className='absolute top-0 right-0 bg-failure hover:bg-failure rounded-tr-[1rem]'
            onClick={() => onDeleteImage('coverInput', coverImage.fileId!)}
          >
            <Trash2 className='text-white-1' />
          </Button>
        ) : (
          <Button
            variant={'outline'}
            className='absolute text-primary bg-background/80 hover:bg-background/80 hover:text-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1rem] font-bold border-2 border-primary'
            size={'sm'}
            onClick={() => document.getElementById('coverInput')?.click()}
          >
            Upload photo
          </Button>
        )}

        <div className='absolute left-6 md:left-24 -bottom-10 md:-bottom-20'>
          <Avatar className='size-20 md:size-40 relative'>
            <AvatarImage
              src={avatarImage.url || '/images/avatar-placeholder.jpg'}
              alt={currentUser?.fullName}
              className='object-cover '
            />
            {avatarImage.fileId ? (
              <Button
                variant={'outline'}
                className='absolute bg-background/80 hover:bg-background/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-failure'
                size={'icon'}
                onClick={() => onDeleteImage('avatarInput', avatarImage.fileId!)}
              >
                <Trash2 className='text-failure' />
              </Button>
            ) : (
              <Button
                variant={'outline'}
                className='absolute text-primary bg-background/80 hover:bg-background/80 hover:text-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1rem] font-bold border-2 border-primary'
                size={'icon'}
                onClick={() => document.getElementById('avatarInput')?.click()}
              >
                <Upload />
              </Button>
            )}
          </Avatar>
        </div>
      </div>

      <Form {...editProfileForm}>
        <form onSubmit={editProfileForm.handleSubmit(onEditProfileFormSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16 md:px-24'>
            <FormField
              control={editProfileForm.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter your full name'
                      className='rounded-[8px] h-10'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editProfileForm.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter your address'
                      className='rounded-[8px] h-10'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editProfileForm.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter your phone number'
                      className='rounded-[8px] h-10'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editProfileForm.control}
              name='facebook'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='https://www.facebook.com/johndoe'
                      className='rounded-[8px] h-10'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editProfileForm.control}
              name='telegram'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Telegram</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='https://t.me/johndoe'
                      className='rounded-[8px] h-10'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editProfileForm.control}
              name='instagram'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='https://www.instagram.com/johndoe'
                      className='rounded-[8px] h-10'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='w-full flex items-center md:justify-end gap-x-4 md:px-24 mt-8 mb-16'>
            <Button
              type='button'
              variant={'outline'}
              className='border-primary text-primary rounded-[8px] text-base hover:bg-transparent hover:text-primary font-bold max-md:flex-1 md:px-12'
              disabled={isSubmitting}
              onClick={() => editProfileForm.reset()}
            >
              Reset
            </Button>
            <Button
              type='submit'
              className='rounded-[8px] text-base font-bold max-md:flex-1 md:px-12'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className='animate-spin' /> Loading...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </Form>

      {['avatarInput', 'coverInput'].map(item => (
        <Input
          key={item}
          id={item}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={onImageUpload}
        />
      ))}
    </>
  )
}

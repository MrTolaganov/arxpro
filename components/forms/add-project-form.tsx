import { AddProjectFormSchema, File, User } from '@/types'
import { Button } from '../ui/button'
import { Loader, Plus, X } from 'lucide-react'
import { Input } from '../ui/input'
import { ChangeEvent, useRef, useState } from 'react'
import { appwriteConfig, storage } from '@/lib/appwrite'
import { ID } from 'appwrite'
import Image from 'next/image'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addProjectFormSchema } from '@/lib/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { createProject } from '@/actions/project.action'

interface AddProjectFormProps {
  currentUser: User
}

export default function AddProjectForm({ currentUser }: AddProjectFormProps) {
  const [projectImages, setProjectImages] = useState<File[]>([])
  const [projectVideo, setProjectVideo] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const projectImagesInputRef = useRef<HTMLInputElement | null>(null)
  const projectVideoInputRef = useRef<HTMLInputElement | null>(null)

  const addProjectForm = useForm<AddProjectFormSchema>({
    resolver: zodResolver(addProjectFormSchema),
    defaultValues: { name: '', description: '', tags: '', location: '', price: '' },
  })

  const onProjectImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const maxFileSize = 5 * 1024 * 1024 // 5MB

    if (!file) return

    if (file.size > maxFileSize) {
      toast.warning('File size exceeds the maximum limit of 1GB.')
      return
    }

    const uploadedFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), file)
    const imageUrl = storage.getFileView(appwriteConfig.bucketId, uploadedFile.$id)

    setProjectImages(projectImages => [
      ...projectImages,
      { fileId: uploadedFile.$id, url: imageUrl },
    ])
  }

  const onProjectVideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const maxFileSize = 100 * 1024 * 1024 // 100MB

    if (!file) return

    if (file.size > maxFileSize) {
      toast.warning('File size exceeds the maximum limit of 1GB.')
      return
    }

    const uploadedFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), file)
    const videoUrl = storage.getFileView(appwriteConfig.bucketId, uploadedFile.$id)

    setProjectVideo({ fileId: uploadedFile.$id, url: videoUrl })
  }

  const onImageRemove = async (fileId: string) => {
    await storage.deleteFile(appwriteConfig.bucketId, fileId)
    setProjectImages(projectImages => projectImages.filter(image => image.fileId !== fileId))
  }

  const onVideoRemove = async (fileId: string) => {
    await storage.deleteFile(appwriteConfig.bucketId, fileId)
    setProjectVideo(null)
  }

  const onAddProjectFormSubmit = (values: AddProjectFormSchema) => {
    if (projectImages.length === 0) {
      toast.error('Please upload at least one project image.')
      return
    }

    if (!projectVideo) {
      toast.error('Please upload a project video.')
      return
    }

    const id = ID.unique()
    const images = projectImages.map(image => image.url!)
    const video = projectVideo.url!
    const tags = values.tags.split(',').map(tag => tag.trim().toLowerCase())
    const author = currentUser
    const price = +values.price

    setIsSubmitting(true)

    createProject({ ...values, id, author, price, images, tags, video })
      .then(({ status, message }) => {
        if (status === 201) {
          toast.success(message)
          setProjectImages([])
          setProjectVideo(null)
          addProjectForm.reset()
        } else {
          toast.error(message)
        }
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className='md:px-24 mt-12'>
      <div className='border-2 border-gray-3 rounded-[8px] p-4 md:p-8'>
        {projectImages.length < 12 && (
          <div className='flex max-md:flex-col-reverse md:items-center gap-4 md:gap-8 mb-4'>
            <Button
              className='rounded-[8px]'
              disabled={isSubmitting}
              onClick={() => projectImagesInputRef.current?.click()}
            >
              <Plus />
              Upload image
            </Button>
            <p className='flex-1 text-base'>
              Please upload the following file formats: .jpeg, .jpg, .png and .webp. You can upload
              maximum 12 files. File size must be less than 5MB.
            </p>
          </div>
        )}

        {projectImages.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {projectImages.map(({ fileId, url }) => (
              <div key={fileId} className='relative w-full h-64 bg-accent'>
                <Button
                  size={'icon'}
                  className='bg-failure absolute top-0 right-0 z-10 hover:bg-failure/90'
                  disabled={isSubmitting}
                  onClick={() => onImageRemove(fileId!)}
                >
                  <X className='text-white-1' />
                </Button>
                <Image src={url!} alt='Project Image' fill />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='border-2 border-gray-3 rounded-[8px] p-4 md:p-8 mt-8 mb-12'>
        {!projectVideo?.fileId && (
          <div className='flex max-md:flex-col-reverse  md:items-center mb-4 gap-4 md:gap-8'>
            <Button
              className='rounded-[8px]'
              disabled={isSubmitting}
              onClick={() => projectVideoInputRef.current?.click()}
            >
              <Plus />
              Upload video
            </Button>
            <p className='flex-1 text-base'>
              Please upload the video .mp4 file format. You can only upload one video file per
              project. File size must be less than 100MB.
            </p>
          </div>
        )}

        {projectVideo?.fileId && (
          <div className='w-full h-64 md:h-[500px] bg-accent relative'>
            <Button
              size={'icon'}
              disabled={isSubmitting}
              className='bg-failure absolute top-0 right-0 z-10 hover:bg-failure/90'
              onClick={() => onVideoRemove(projectVideo.fileId!)}
            >
              <X className='text-white-1' />
            </Button>
            <video controls className='size-full object-cover'>
              <source src={projectVideo.url!} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      <Input
        ref={projectImagesInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={onProjectImageUpload}
      />

      <Input
        ref={projectVideoInputRef}
        type='file'
        accept='video/*'
        className='hidden'
        onChange={onProjectVideoUpload}
      />

      <Form {...addProjectForm}>
        <form onSubmit={addProjectForm.handleSubmit(onAddProjectFormSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16'>
            <FormField
              control={addProjectForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder='Enter project name'
                      className='rounded-[8px] h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addProjectForm.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                      disabled={isSubmitting}
                      placeholder='Enter project price ($)'
                      className='rounded-[8px] h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addProjectForm.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder='Enter project location (e.g. city, country)'
                      className='rounded-[8px] h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addProjectForm.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-1 text-base'>Tags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder='Enter project tags (e.g. technology, industry)'
                      className='rounded-[8px] h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={addProjectForm.control}
            name='description'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel className='mb-1 text-base'>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    disabled={isSubmitting}
                    className='rounded-[8px]'
                    placeholder='Type about your project details...'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isSubmitting}
            className='mt-6 mb-12 max-md:w-full text-base rounded-[8px] md:px-16'
          >
            {isSubmitting ? (
              <>
                <Loader className='animate-spin' /> Loading...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

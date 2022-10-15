import { useToast } from '@chakra-ui/toast';

import { useUploadFileToS3Mutation } from '@apis/S3FileUploader/S3FileUploaderApi.mutation';

const useProfileUpload = () => {
  const toast = useToast();
  const mutation = useUploadFileToS3Mutation();

  const uploadFilesToS3 = async (file: File) => {
    const { url } = await mutation.mutateAsync(
      { file },
      {
        onError: () =>
          toast({
            status: 'error',
            description: '프로필이미지 업로드에 실패하였습니다',
          }),
      },
    );

    return url;
  };

  return { uploadFilesToS3, mutation };
};

export default useProfileUpload;

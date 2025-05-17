import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import usePostLp from '../../hooks/mutations/usePostLp';
import ImageUploadButton from '../ImageUploadButton';

interface AddLpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  title: z.string().min(1, { message: 'Lp Name은 1자 이상이어야 합니다.' }),
  content: z.string(),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()),
  published: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

const AddLpModal = ({ isOpen, onClose }: AddLpModalProps) => {
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, getValues, setValue, watch } =
    useForm<FormFields>({
      defaultValues: {
        title: '',
        content: '',
        tags: [],
        published: false,
      },
      resolver: zodResolver(schema),
      mode: 'onBlur',
    });

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;

    const currentTags = getValues('tags');
    if (!currentTags.includes(trimmed)) {
      setValue('tags', [...currentTags, trimmed]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (index: number) => {
    const currentTags = getValues('tags');
    const updatedTags = currentTags.filter((_, i) => i !== index);
    setValue('tags', updatedTags);
  };

  const { mutateAsync: addLpMutate } = usePostLp();
  const handleAddLpMutate = async (data: FormFields) => {
    const response = await addLpMutate(data);
    console.log(response);
  };

  const handleImageChange = (file: File, previewUrl: string) => {
    setImageFile(file);
    setPreview(previewUrl);
    setValue('thumbnail', previewUrl); // base64로 저장 (API 요구에 따라 조정)
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={'relative z-50'} onClose={onClose}>
        {/* 배경 오버레이 */}
        <Transition.Child
          as={Fragment}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        {/* 모달 컨텐츠 */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="relative flex flex-col items-center justify-center w-full max-w-md bg-gray-600 p-8 rounded-lg shadow-lg">
              <FiX
                className="absolute top-6 right-6 w-5 h-5 text-white cursor-pointer"
                onClick={onClose}
              />
              <div className="w-full flex flex-col items-center justify-center gap-10">
                {/* <img src="/images/Lp.svg" alt="Lp" className="w-60 h-60" /> */}
                <div className="w-60 h-60">
                  <ImageUploadButton
                    onChange={handleImageChange}
                    preview={preview}
                    fallback="images/Lp.svg"
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full rounded-md border-2 border-gray-400 placeholder-gray-400 p-2 text-white"
                    placeholder="LP Name"
                    required
                  ></input>
                  <input
                    {...register('content')}
                    type="text"
                    className="w-full rounded-md border-2 border-gray-400 placeholder-gray-400 p-2 text-white"
                    placeholder="LP Content"
                    required
                  ></input>
                  <div className="flex w-full gap-2">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="w-full rounded-md border-2 border-gray-400 placeholder-gray-400 p-2 text-white"
                      placeholder="LP Tag"
                      required
                    ></input>
                    <button
                      onClick={handleAddTag}
                      className={`w-20 rounded-md text-white ${tagInput.trim() ? 'bg-pink-500 hover:bg-pink-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {watch('tags').map((tag, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center gap-1 bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                      >
                        <div>{tag}</div>
                        <FiX
                          onClick={() => handleDeleteTag(idx)}
                          className="text-sm text-white cursor-pointer inline"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleSubmit(handleAddLpMutate)}
                  className={`w-full rounded-md text-white p-2 ${watch('title').trim() && watch('content').trim() ? 'bg-pink-500 hover:bg-pink-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  Add LP
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddLpModal;

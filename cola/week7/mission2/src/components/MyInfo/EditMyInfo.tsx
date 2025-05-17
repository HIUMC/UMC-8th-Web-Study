import { useState, useEffect } from 'react';
import { ResponseMyInfoDto } from '../../types/auth';
import { getMyInfo } from '../../apis/auth';
import { FiUser } from 'react-icons/fi';
import useEditMyInfo from '../../hooks/mutations/useEditMyInfo';
import ImageUploadButton from '../ImageUploadButton';

type EditMyInfoProps = {
  setEditMyInfoState: React.Dispatch<React.SetStateAction<boolean>>;
  myInfo: ResponseMyInfoDto;
  setMyInfo: React.Dispatch<React.SetStateAction<ResponseMyInfoDto>>;
};

const EditMyInfo = ({
  setEditMyInfoState,
  myInfo,
  setMyInfo,
}: EditMyInfoProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate: editMyInfo } = useEditMyInfo();

  const [form, setForm] = useState({
    name: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setMyInfo(response);

      setForm({
        name: response.data.name ?? '',
        bio: response.data.bio ?? '',
        avatar: response.data.avatar ?? '',
      });
    };
    getData();
  }, []);

  const handleEdit = () => {
    if (form.name.trim().length < 1) {
      alert('이름은 1글자 이상 입력해주세요');
      return;
    }

    editMyInfo({
      name: form.name,
      bio: form.bio || null,
      avatar: form.avatar || null,
    });

    setEditMyInfoState(false);

    alert('회원정보가 변경되었습니다!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File, previewUrl: string) => {
    setImageFile(file);
    setPreview(previewUrl);
    setForm({ ...form, avatar: previewUrl });
  };

  return (
    <div className="flex w-full text-white">
      <div className="w-20 h-20">
        <ImageUploadButton
          onChange={handleImageChange}
          preview={preview ?? myInfo.data?.avatar}
          fallback={<FiUser className="w-full h-full" />}
        />
      </div>
      <div className="flex flex-col w-50 gap-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border-2 border-white rounded-md p-1"
          placeholder="이름을 입력해주세요"
        />
        <input
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="border-2 border-white rounded-md p-1"
          placeholder="자기소개를 입력해주세요"
        />
        <div className="text-sm p-1">{myInfo.data.email}</div>
        <button
          onClick={handleEdit}
          className="cursor-pointer w-15 h-10 bg-pink-500 rounded-md"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditMyInfo;

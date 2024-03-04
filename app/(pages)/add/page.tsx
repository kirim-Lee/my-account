import { Close } from '@/app/component/icon/Close';
import Form from './Form';
import { BackButton } from '@/app/component/atom/BackButton';

const AddAccount = () => {
  return (
    <div className="modal-page">
      <div className="flex flex-[auto_30px] flex-row w-full justify-between">
        <h1 className="title h1 grow text-center">Register</h1>
        <BackButton className="flex-none button circle">
          <Close color="white" className="w-5 h-5" />
        </BackButton>
      </div>
      <Form />
    </div>
  );
};

export default AddAccount;

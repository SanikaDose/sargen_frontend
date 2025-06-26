'use client';
import { useRouter } from 'next/navigation';
import { useActiveAccountMutation } from '../registerApi';
import InformativeComponent from '@/components/InformativeComponent/InformativeComponent';
import { pageRoutes } from '@/constants/pagesRoutes';

const Page = () => {
  const [activeAccount] = useActiveAccountMutation();
  const text = 'To Activate Account Click Below';
  const router = useRouter();

  async function handleActivateAccount() {
    const sidObj = {
      sid: location.hash.substring(1),
    };
    try {
      const api = await activeAccount(sidObj).unwrap();
      if (api?.success) {
        router.push(pageRoutes.unprotected.login);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return <InformativeComponent content={text} behaviour={handleActivateAccount} />;
};

export default Page;

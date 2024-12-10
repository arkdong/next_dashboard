import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div className={`${lusitana.className} flex flex-row relative text-white`}>
      <Image src="/logo.png" width={80} height={120} alt="Acme logo" className='relative inset-y-0 left-0' />
      <p className="absolute text-[24px] inset-y-0 right-12 w-4">Shenzhou Open University</p>
    </div>
  );
}

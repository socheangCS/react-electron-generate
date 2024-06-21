import  { useState } from 'react';
import { useCS } from './contexts/CScontext';
import QrCodeGenerator from './components/QrCodeGenerator';
import { Alert } from '@material-tailwind/react';

function App(): JSX.Element {
  const [uuid, setUuid] = useState<string | undefined>();
  const [isAlert,setIsAlert] = useState<boolean>(false);
  const { getUniqueId } = useCS();
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    );
  }

  const handleUuidGenerator = () => {
    setIsAlert(false)
    getUniqueId().then((res) => {
      setUuid(res);
    });
  };
  return (
    <div className='w-full flex flex-col p-20'>
      <div>
          {isAlert&&
          <Alert className='text-sm h-10 flex items-center w-52' icon={<Icon />}>Copied</Alert>  
           }
          <div className='flex items-center gap-2 mt-1'>
          <button
            onClick={handleUuidGenerator}
            className='p-2 text-sm rounded-md hover:duration-300 hover:scale-105 text-white bg-black'
          >
            Generate UUID
          </button>
          <p>{uuid && uuid}</p>
          {uuid && (
            <div className='flex gap-1 '>
             <button
                onClick={() => {
                  navigator.clipboard.writeText(uuid);
                  setIsAlert(true)
                }}
                className='p-2 text-sm rounded-md hover:duration-300 hover:scale-105 text-black border-black border bg-white'
              >
                Copy
              </button>
              <button
                onClick={() =>{setIsAlert(false); setUuid('')}}
                className='p-2 text-sm rounded-md hover:duration-300 hover:scale-105 text-white bg-black'
              >
                Clear
              </button>
            </div>
          )}
        </div>
        <QrCodeGenerator />
      </div>
    </div>
  );
}

export default App;

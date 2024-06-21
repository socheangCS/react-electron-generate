import React, {useState } from 'react';
import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';

const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [qrVisible, setQrVisible] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if (!event.target.value) {
      setQrVisible(false);
    }
  };

  const handleQrGenerate = () => {
    if (text) {
      setQrVisible(true);
    }
  };

  const downloadQRCode = () => {
    htmlToImage
      .toPng(document.getElementById('qrCodeContainer') as HTMLElement)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
      })
      .catch(function (error) {
        console.error('Error generating QR code:', error);
      });
  };

  return (
    <div className="mt-5 flex flex-col gap-2">
      <h1 className="font-bold">QR Code Generator</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter URL or Text"
          className="border outline-none p-2 text-[12px] placeholder:text-[12px] pl-5 rounded-md"
        />
        <button
          onClick={handleQrGenerate}
          className="p-2 text-sm rounded-md hover:duration-300 hover:scale-105 text-white bg-black"
        >
          Generate QR
        </button>
      </div>
      {qrVisible && (
        <div id="qrCodeContainer" className="flex flex-col gap-2">
          <QRCode value={text} />
          <button
            onClick={downloadQRCode}
            className="p-2 text-sm rounded-md hover:duration-300 hover:scale-105 text-white bg-black"
          >
            Download QR
          </button>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;

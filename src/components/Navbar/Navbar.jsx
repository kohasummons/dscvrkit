'use client'

import React, { useState, useEffect } from 'react';
import { ConnectText, Logo, LogoText } from '@/src/assets/icons/icons';
import Link from 'next/link';

import useCanvasWallet from "../../providers/CanvasWalletProvider";
import BlockiesSvg from 'blockies-react-svg'

const Navbar = () => {
  const { connectWallet, walletAddress, walletIcon, userInfo, content, signTransaction } =
    useCanvasWallet();

  console.log(userInfo)

  // const [walletAddress, setWalletAddress] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for controlling dropdown visibility



  // Check if the wallet is already connected on load
  const checkIfWalletIsConnected = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect({ onlyIfTrusted: true });
        setWalletAddress(resp.publicKey.toString());
      } catch (err) {
        console.error('Error checking if wallet is connected:', err);
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='flex w-full flex-row' onClick={connectWallet}>
      {/* Logo Section */}
      <div className='flex flex-row gap-4 bg-white p-4 w-8/12 justify-start items-center'>
        <Logo />
        <LogoText />
      </div>

      {/* Connect Wallet Button or Wallet Address Section */}
      <div className='relative w-4/12'>
        <div
          className='flex flex-row gap-4 bg-[#363FD7] p-4 cursor-pointer w-full relative justify-center items-center'
        >
          <span>
            {(userInfo && walletAddress) && (
              <div className='flex flex-row items-center gap-4'>
                <div>
                  {userInfo.avatar ? (
                    <img
                      className="h-[45px] w-[45px] rounded-full border-cyan-300 border-4"
                      src={userInfo.avatar}
                      alt="User Avatar"
                    />
                  ) : (
                    <BlockiesSvg
                      address={walletAddress}
                      className='h-[45px] w-[45px] flex items-center justify-center rounded-full'
                    />)}

                </div>
                <div>
                  <span className='text-[24px] font-extrabold text-center text-[#D9DBFF] tracking-[-1px] md:tracking-[-2px]'>
                    {`${walletAddress.slice(0, 3)}...${walletAddress.slice(-3)}`}
                  </span>
                </div>
              </div>
            )}
          </span>
          <span className='text-[20px] font-extrabold text-center text-[#D9DBFF] tracking-[-1px] md:tracking-[-2px]'>
            {!walletAddress && ('Connect Wallet')}
          </span>
        </div>

      </div>
    </div>
  );
};


export default Navbar;
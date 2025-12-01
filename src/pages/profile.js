"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------- NAVBAR ----------------
const Navbar = ({ activePath }) => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Profile', href: '/profile' },
    { name: 'Work', href: '/works' },
    { name: 'Membership', href: '/membership' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-slate-900 border-b border-slate-800">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-indigo-400">JK Constructions</h1>
        <p className="text-slate-400 text-sm mt-0.5">Building Dreams</p>
      </div>

      <nav>
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`
                  transition duration-150 font-medium
                  ${activePath === link.href
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-slate-300 hover:text-indigo-400'}
                `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// ---------------- PAGE ANIMATION ----------------
const pageVariants = {
  initial: { opacity: 0, rotateY: 90 },
  in: { opacity: 1, rotateY: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, rotateY: -90 },
};

// ---------------- OTP MODAL ----------------
const OtpModal = ({ isOpen, onClose, onSendOtp, onVerify, phoneNumber }) => {
  const [otp, setOtp] = useState("");
  // NOTE: In a real application, you'd track if OTP was sent successfully
  const [otpSent, setOtpSent] = useState(false);

  const handleSend = () => {
    // Simulate sending OTP (in real app, this calls an API)
    onSendOtp(phoneNumber);
    setOtpSent(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7 }}
            className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 max-w-sm w-full"
          >
            <h2 className="text-indigo-300 text-xl font-semibold mb-2 text-center">
              Verify Phone Number
            </h2>
            <p className="text-slate-400 text-center mb-4">
              {otpSent
                ? `Enter the OTP sent to ${phoneNumber}`
                : `Click 'Send OTP' to verify ${phoneNumber}`}
            </p>

            {/* OTP Input and Send Button */}
            <div className="flex space-x-3 mt-3">
              <input
                type="text"
                disabled={!otpSent} // Disable input until OTP is 'sent'
                className="flex-grow px-3 py-2 bg-slate-900 text-slate-200 rounded-lg border border-slate-700 focus:border-indigo-400 outline-none"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleSend}
                disabled={otpSent}
                className={`px-4 py-2 rounded-lg transition ${
                  otpSent
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                {otpSent ? 'Resend' : 'Send OTP'}
              </button>
            </div>


            <div className="flex justify-between mt-5">
              <button
                // Calls the onClose passed from parent (which now includes the revert logic)
                onClick={() => { onClose(); setOtpSent(false); setOtp(""); }} 
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
              >
                Cancel
              </button>

              <button
                onClick={() => onVerify(otp)}
                disabled={!otpSent || otp.length < 4} // Require OTP to be 'sent' and have content
                className={`px-4 py-2 rounded-lg transition ${
                  !otpSent || otp.length < 4
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                Verify
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------------- PROFILE PAGE ----------------
export default function Profile() {
  const [editable, setEditable] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  
  // Use a ref for the hidden file input
  const fileInputRef = useRef(null); 

  const initialProfileState = {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phone: "9876543210",
    phoneVerified: false,
    memberSince: "2023-01-15",
    photoUrl: "https://i.pravatar.cc/120"
  };

  const [profile, setProfile] = useState(initialProfileState);
  // NEW STATE: Store the profile data as it was when edit mode began
  const [originalProfile, setOriginalProfile] = useState(initialProfileState);


  // --- Logic to start edit mode ---
  const handleEdit = () => {
    // 1. Save the current state to the originalProfile state for potential revert
    setOriginalProfile(profile); 
    // 2. Enable editing
    setEditable(true);
  };
  
  // --- Logic to cancel/revert changes ---
  const handleCancel = () => {
    // 1. Revert the profile back to the original saved state
    setProfile(originalProfile);
    // 2. Disable editing
    setEditable(false);
  };

  // --- Logic to save changes ---
  const handleSave = () => {
      // NOTE: In a real app, you would call an API to save here.
      // After a successful API save, we update the original profile state
      // so future cancels don't revert past saves.
      setOriginalProfile(profile);
      setEditable(false);
  }

  // --- Image Upload Logic ---
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newPhotoUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photoUrl: newPhotoUrl });
      // Clear the input value so the same file can be selected again
      event.target.value = null; 
    }
  };
  
  const handlePhotoClick = () => {
    if (editable) {
        fileInputRef.current.click(); 
    }
  }
  // --- END Image Upload Logic ---


  // --- OTP Logic ---
  const handleSendOtp = (phoneNumber) => {
    console.log(`Simulating sending OTP to: ${phoneNumber}`);
    alert(`OTP '1234' sent to ${phoneNumber}.`);
  };

  const handleVerifyOtp = (otp) => {
    if (otp === "1234") {
      setProfile({ ...profile, phoneVerified: true });
      setOtpOpen(false);
      alert("Phone number verified successfully!");
    } else {
      alert("Invalid OTP");
    }
  };
  // --- END OTP Logic ---

  const currentPath = "/profile";

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen bg-slate-900"
    >

      <Navbar activePath={currentPath} />

      {/* HEADER */}
      <header className="text-center py-8 px-6">
        {/* Hidden file input */}
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
        />
        
        {/* Profile Photo - Made Editable */}
        <motion.div
            className={`
                relative inline-block rounded-full border-4 shadow-xl mx-auto cursor-pointer group 
                ${editable ? 'border-indigo-400' : 'border-slate-700'}
            `}
            onClick={handlePhotoClick}
            whileHover={editable ? { scale: 1.05 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <img
                src={profile.photoUrl}
                alt="User Profile"
                className="w-32 h-32 object-cover rounded-full"
            />
            
            {/* Edit Overlay */}
            {editable && (
                <div className="absolute inset-0 w-full h-full rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="text-white text-sm font-semibold">
                        Edit Photo
                    </span>
                </div>
            )}
        </motion.div>

        <h1 className="text-4xl font-bold text-indigo-400 mt-4">Welcome, {profile.name}</h1>
        <p className="text-slate-400">Your Personal Dashboard</p>
      </header>

      {/* PROFILE CARD */}
      <section className="bg-slate-800 shadow-xl p-6 rounded-2xl max-w-3xl mx-auto m-6 border border-slate-700">

        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Account Information</h2>

        <div className="space-y-4">

          {/* Name Input */}
          <div>
            <p className="text-slate-400 mb-1">Name</p>
            <input
              disabled={!editable}
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className={`w-full px-3 py-2 bg-slate-900 text-slate-200 rounded-lg border
              ${editable ? 'border-indigo-400' : 'border-slate-700'}`}
            />
          </div>

          {/* Email Input */}
          <div>
            <p className="text-slate-400 mb-1">Email</p>
            <input
              disabled={!editable}
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className={`w-full px-3 py-2 bg-slate-900 text-slate-200 rounded-lg border
              ${editable ? 'border-indigo-400' : 'border-slate-700'}`}
            />
          </div>

          {/* Phone Number Input with Verification */}
          <div>
            <p className="text-slate-400 mb-1">Phone Number</p>
            <div className="flex space-x-3">
              <input
                disabled={!editable}
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value, phoneVerified: false})}
                className={`flex-grow px-3 py-2 bg-slate-900 text-slate-200 rounded-lg border
                ${editable ? 'border-indigo-400' : 'border-slate-700'}`}
              />
              <button
                onClick={() => setOtpOpen(true)}
                disabled={!editable}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  profile.phoneVerified
                    ? 'bg-green-600 text-white'
                    : editable
                      ? 'bg-yellow-600 text-white hover:bg-yellow-500'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }`}
              >
                {profile.phoneVerified ? 'Verified ✅' : 'Verify Phone'}
              </button>
            </div>
          </div>

          <p className="text-slate-400">
            <strong className="text-indigo-400">Member Since:</strong> {profile.memberSince}
          </p>

        </div>

        {/* EDIT / CANCEL / SAVE BUTTONS */}
        {!editable ? (
          <button
            onClick={handleEdit} // Calls handleEdit to save current state
            className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition w-full"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-4 mt-6">
            <button
                onClick={handleCancel} // Calls handleCancel to revert state
                className="bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition flex-grow"
            >
                Cancel
            </button>
            <button
              onClick={handleSave} // Calls handleSave
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition flex-grow"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* LOGOUT */}
        <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition w-full">
          Log Out
        </button>
      </section>

      {/* OTP MODAL */}
      <OtpModal
        isOpen={otpOpen}
        onClose={() => { setOtpOpen(false); }} // Removed the redundant revert since the CANCEL button handles it now
        onSendOtp={handleSendOtp}
        onVerify={handleVerifyOtp}
        phoneNumber={profile.phone}
      />

    </motion.main>
  );
}
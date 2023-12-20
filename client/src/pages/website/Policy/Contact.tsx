import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_rlpm9rm', 'template_0ho9c2k', form.current, 'rdf9wXwwFEzt3dUdZ')
            .then((result) => {
                console.log(result.text);
                setShowSuccessMessage(true);
                // Reset form fields
                setName('');
                setEmail('');
                setMessage('');
            }, (error) => {
                console.log(error.text);
                alert("Sorry, an error occurred. Please try again later.");
            });
    };

    return (
        <div className="sm:flex max-sm:w-[360px] m-auto max-sm:mb-4 mt-20px">
            <div className="sm:w-[50%]">
                <div className="sm:ml-[160px] pt-50px">
                    {/* <h3 className="font-public-sans text-[#23314B] text-[17px]"></h3> */}
                    <h1 className="font-public-sans text-3xl text-[#23314B] my-4 font-semibold max-sm:text-center text-[44px] mt-[70px]">Bạn có câu hỏi nào không?</h1>
                </div>
            </div>
            <div className="border-l-2 border-gray-200 sm:ml-4 pl-4 sm:w-[50%] bg-[#F5F5F5] rounded p-6 mx-auto mt-30">
                {/* Form */}
                <form ref={form} onSubmit={sendEmail}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="font-public-sans block text-gray-600 font-medium">Họ và Tên</label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="font-public-sans form-input mt-1 p-2 w-full rounded"
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input mt-1 p-2 w-full rounded"
                                placeholder="example@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-600 font-medium">Tin Nhắn</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-textarea mt-1 p-2 w-full h-32 rounded"
                            placeholder="Nhập tin nhắn của bạn"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="font-public-sans bg-[#23314B] text-white py-3 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                            value="Send"
                        >
                            Gửi tin nhắn
                        </button>
                    </div>
                </form>

                {/* Hiển thị thông báo chúc mừng nếu showSuccessMessage là true */}
                {showSuccessMessage && (
                    <p className="text-green-500 font-bold text-center mt-2">
                        Tin nhắn của bạn đã được gửi!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Contact;

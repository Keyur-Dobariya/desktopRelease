import React, { useEffect, useState } from 'react'
import imagePaths from '../utils/imagesPath'
import { useNavigate } from "react-router-dom";
import validationRules from '../utils/validationRules';
import appString from '../utils/appString';
import appKeys from '../utils/appKeys';
import pageRoutes from '../utils/pageRoutes';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { isDevMode, environment } from '../api/apiEndpoints';

export default function Login() {
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isDevMode) {
            form.setFieldsValue({
                emailAddress: 'admin@gmail.com',
                password: 'Admin@123'
            })
        }
    }, []);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await onFormSubmit();
        }
    };

    const onFormSubmit = async () => {
        try {
            await form.validateFields();

            const formData = form.getFieldsValue();
            await apiCall({
                method: HttpMethod.POST,
                url: endpoints.login,
                data: formData,
                setIsLoading: setLoading,
                successCallback: async (data) => {
                    form.resetFields();
                    storeLoginData(data, true);

                    if (window.electronAPI) {
                        await window.electronAPI.sendLoginData(data);
                    }

                    navigate(pageRoutes.tracker);
                },
            });
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col xl:flex-row justify-center items-center overflow-hidden">
            <div
                className="w-full bg-(--primary-color) bg-cover bg-center p-5 xl:w-2/5 xl:h-full flex flex-col justify-around items-center"
                style={{ backgroundImage: `url('${imagePaths.auth_design_bg}')` }}
            >
                <div className="text-center">
                    <img
                        className="place-self-center w-45 h-11"
                        src={imagePaths.icon_big_white}
                        alt="icon"
                        width={200}
                        height={60}
                    />
                </div>
            </div>

            <div className="overflow-y-auto w-full bg-white flex-1 xl:h-full flex justify-center xl:items-center relative">
                <div className='mt-5'>
                    <div className="font-medium text-[18px]">{appString.signInTitle}</div>
                    <div className="w-[25px] h-[5px] rounded-xl bg-amber-500 my-2" />
                    <div className="text-gray-500 text-sm mb-7 xl:text-base">{appString.signInDes}</div>
                    <Form
                        form={form}
                        name="signin"
                        onKeyDown={handleKeyDown}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            name={appKeys.emailAddress}
                            rules={validationRules[appKeys.emailAddress]}
                            hasFeedback
                        >
                            <Input
                                prefix={<MailOutlined />}
                                maxLength={100}
                                placeholder={appString.emailAddress}
                                inputMode="email"
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item
                            name={appKeys.password}
                            rules={validationRules[appKeys.password]}
                            hasFeedback
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder={appString.password}
                                type="password"
                            />
                        </Form.Item>
                    </Form>
                    <div className="mb-4 text-end cursor-pointer text-blue-700 font-semibold hover:text-blue-500" onClick={async () => {
                        const email = form.getFieldValue(appKeys.emailAddress) || '';
                        const forgotUrl = `${environment.webBaseUrl}/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ''}`;
                        await window.electronAPI.openExternalLink(forgotUrl);
                    }}>
                        {appString.forgotPassword}
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full my-2" onClick={onFormSubmit}>{appString.login}</Button>
                    <div className="text-gray-500 text-center my-2">
                        {appString.dontAcc}
                        <span
                            className="cursor-pointer text-blue-700 font-semibold hover:text-blue-500"
                            onClick={async () => {
                                if (isElectron) {
                                    const signupUrl = `https://whogetsa.web.app/signup`;
                                    await window.electronAPI.openExternalLink(signupUrl);
                                } else {
                                    navigate(pageRoutes.signupPage);
                                }
                            }}
                        >
                            {" "}
                            {appString.signUp}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { Avatar, Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaBell, FaCamera, FaEdit, FaImage, FaLock, FaSignOutAlt, FaUserCheck } from 'react-icons/fa'

import users_api from '../utils/users_api'

import ChangePassword from '../components/ChangePassword'
import profilePic from "../assets/Rectangle 37.png"


const Settings = (props) => {
    var cookieDetails = props.myCookie
    var firstName = props.firstName;
    var lastName = props.lastName;
    var email_address = props.email;
    var phoneNumber = props.phoneNumber

    const [email, setEmail] = useState('')
    const phone_number_ref = useRef(null)
    const [new_phone_number, setNew_phone_number] = useState()
    const [makeReadOnly, setMakeReadOnly] = useState(true)
    const [resetPassword, setResetPassword] = useState(false)

    const fileInputRef1 = useRef(null);
    

    // for KYC update
    const home_address_ref = useRef(null);
    const state_ref = useRef(null);
    const document_type_ref = useRef(null);
    const fileInputRef2 = useRef(null)
    

    const [basic_details, setBasic_details] = useState({
        
    })

    
    const handleButtonDeleteImage = () => {

    }

    const changePhoneNumberInput = () => {
        setBasic_details((prevValue) => ({"phoneNumber": phone_number_ref.current.value, ...prevValue }))
        console.log(basic_details)
    }
    const handleButtonUploadDocs = () => {
        
    }

    const  updateProfileInfo= () => {
        console.log("Clicked")
        console.log(phone_number_ref.current.value, phone_number_ref.current.value.length )
        if ((phone_number_ref.current.value.length > 10) && (phone_number_ref.current.value.length < 15)){
            console.log("Condition true")
            users_api.post("updateProfileInfo.php", {
                "userToken": basic_details["userToken"],
                "phoneNumber": phone_number_ref.current.value,
                "profilePicture": btoa(fileInputRef1.current.value)
            }).then((response) => {
                console.log(response)
            })
            .catch(error => (
                console.log(error)
            ))
        }
    };

    const updateKYC = (event) => {
        event.preventDefault()
        if ( (home_address_ref.current.value != Number(0)) && (state_ref.current.value != Number(0)) && (document_type_ref.current.value != Number(0)) && (fileInputRef2.current.value != Number(0)) ){
            console.log("About to send")
            console.log("home", home_address_ref.current.value, "state", state_ref.current.value, "document", document_type_ref.current.value, "file", fileInputRef2.current.value)
            users_api.post("updateKYC.php", {
                "userToken": cookieDetails.userToken,
                "homeAddress": home_address_ref.current.value,
                "state": state_ref.current.value,
                "documentType": document_type_ref.current.value,
                "documentImage": fileInputRef2.current.value
            })
            .then((response) => {
                console.log(response)
            })
        }
    }

    useEffect(() => {
        setBasic_details(cookieDetails)
    })

    return (
        <div>
            <Card>
                <div className='flex flex-col gap-3 w-full md:w-3/5 rounded-none'>
                    <p className='font-bold mb-2'>Account Information</p>
                    <div className='flex items-center gap-12 mb-3'>
                        <Label value='Email' htmlFor='email' />
                        <div className='flex gap-4'>
                            <TextInput type="email" value={basic_details["email"]} id='email' sizing="xl" className='rounded-r-none border-r-0 outline-none rounded-none w-[20rem]' />
                            <Button outline disabled>Edit</Button>
                        </div>
                        
                    </div>
                    <div className='flex items-center gap-6'>
                        <Label value='Password' htmlFor='id' />
                        <Button className='bg-c-lightgreen' onClick={() => setResetPassword(true)}>Change Password</Button>
                        {
                            resetPassword && <ChangePassword showModal={resetPassword} openModal={() => setResetPassword(true)} closeModal={() => setResetPassword(false) } userToken={cookieDetails.userToken} />
                        }
                    </div>
                </div>
            </Card>
            <Card className='mt-4 rounded-none'>
                <p className='font-bold mb-2'>Profile Information</p>
                <div className='flex flex-col md:flex-row gap-4 '>
                    <div className='flex flex-col gap-4 w-full md:w-4/6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='First Name' htmlFor='firstName' className='w-2/4' />
                            <TextInput value={basic_details["firstName"]} readOnly id='firstName' className='flex-grow w-[60rem]' />
                            <div className='w-20' /> {/* Placeholder for alignment */}
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Last Name' htmlFor='lastName' className='w-2/4' />
                            <TextInput defaultValue={basic_details["lastName"]} id='lastName' className='flex-grow w-[60rem] border-c-lightgreen' />
                            <div className='w-20' /> {/* Placeholder for alignment */}

                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Phone Number' htmlFor='phoneNumber' className='w-1/4' />
                            <TextInput defaultValue={basic_details["phoneNumber"]} readOnly={makeReadOnly} onChange={changePhoneNumberInput} ref={phone_number_ref} id='phoneNumber' className='flex-grow ' />
                            <Button onClick={() => (setMakeReadOnly(false))} outline className='flex-none w-20 hover:text-black active:text-black'>Edit</Button>
                            <div className='w-10' /> {/* Placeholder for alignment */}
                        </div>
                    </div>
                    <div className=' flex flex-col gap-2 items-center w-2/6'>
                        <img src={profilePic} alt="" className='w-[50%] h-[50%]' />
                        <div className='relative mt-1'>
                            <input
                                type='file'
                                ref={fileInputRef1}
                                className='hidden'
                                onChange={(e) => console.log(e.target.files)}
                                accept='image/*'
                            />
                            <Button outline className='flex items-center' onClick={() => fileInputRef1.current.click()}>
                                <div className='flex items-center gap-2'>
                                    <FaCamera />
                                    Change image
                                </div>
                            </Button>
                        </div>
                        <p className='mt-2 font-medium'>Delete image</p>
                        <Button type='button' onClick={updateProfileInfo} className='bg-c-lightgreen'>Save</Button>
                    </div>
                </div>
            </Card>
            <Card className='mt-4 rounded-none'>
                <p className='font-bold mb-2'>KYC</p>
                <form onSubmit={updateKYC}>
                    <div className='flex gap-4 '>
                        <div className='w-3/5'>
                            <div className='flex items-center gap-2 mb-3'>
                                <Label value='Full Address' htmlFor='address' className='w-1/4' />
                                <TextInput ref={home_address_ref} id='address' className='flex-grow' />
                            </div>
                            <div className='flex items-center gap-2 mb-3'>
                                <Label value='State' htmlFor='state' className='w-1/4' />
                                <Select ref={state_ref} id='state' className='flex-grow' >
                                    <option value="Abia">Abia</option>
                                    <option value="Adamawa">Adamawa</option>
                                    <option value="Akwa-ibom">Akwa Ibom</option>
                                    <option value="Anambra">Anambra</option>
                                    <option value="Bauchi">Bauchi</option>
                                    <option value="Bayelsa">Bayelsa</option>
                                    <option value="Benue">Benue</option>
                                    <option value="Borno">Borno</option>
                                    <option value="Cross-river">Cross-river</option>
                                    <option value="Delta">Delta</option>
                                    <option value="Ebonyi">Ebonyi</option>
                                    <option value="Edo">Edo</option>
                                    <option value="Ekiti">Ekiti</option>
                                    <option value="Enugu">Enugu</option>
                                    <option value="Gombe">Gombe</option>
                                    <option value="Imo">Imo</option>
                                    <option value="Jigawa">Jigawa</option>
                                    <option value="Kaduna">Kaduna</option>
                                    <option value="Kano">Kano</option>
                                    <option value="Katsina">Katsina</option>
                                    <option value="Kebbi">Kebbi</option>
                                    <option value="Kogi">Kogi</option>
                                    <option value="Kwara">Kwara</option>
                                    <option value="Lagos">Lagos</option>
                                    <option value="Nasarawa">Nasarawa</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Ogun">Ogun</option>
                                    <option value="Ondo">Ondo</option>
                                    <option value="Osun">Osun</option>
                                    <option value="Oyo">Oyo</option>
                                    <option value="Plateau">Plateau</option>
                                    <option value="Rivers">Rivers</option>
                                    <option value="Sokoto">Sokoto</option>
                                    <option value="Taraba">Taraba</option>
                                    <option value="Yobe">Yobe</option>
                                    <option value="Zamfara">Zamfara</option>
                                    <option value="FCT">FCT</option>
                                </Select>
                            </div>
                            <div className='flex items-center gap-2 mb-3'>
                                <Label value='DocumentType' htmlFor='docType' className='w-1/4' />
                                {/* <TextInput value={email} id='phoneNumber' className='flex-grow' /> */}
                                <Select ref={document_type_ref} id='docType' className='flex-grow'>
                                    <option value="BVN">BVN</option>
                                    <option value="NIN">NIN</option>
                                </Select>
                            </div>
                        </div>
                        <div className=' w-2/5'>
                            <div className='flex flex-col gap-3 items-center'>
                                <p className='mt-2 font-light'>Upload </p>
                                <div className=' mt-1'>
                                    <input
                                        type='file'
                                        ref={fileInputRef2}
                                        className='hidden'
                                        onChange={(e) => console.log(e.target.files)}
                                        accept=''
                                    />
                                    <Button outline className='flex items-center' onClick={() => fileInputRef2.current.click()}>
                                        <div className='flex items-center gap-2'>
                                            Upload Document
                                            <FaImage />
                                        </div>
                                    </Button>
                                </div>
                                <Button type='submit' className='bg-c-lightgreen'>Save</Button>
                            </div>
                        </div>
                    </div>
                </form>
                
            </Card>


        </div>
    )
}

export default Settings
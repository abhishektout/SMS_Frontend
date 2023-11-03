import './Style.css'
import axios from 'axios';
import api from '../WebApi/api';
import { useState } from 'react';
import Navbaar from '../Navbar/navbar';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function AdmissionProcess() {
    const [verifyTransactionIdFlag, setVerifyTransactionIdFlag] = useState(false);
    const [stdName, setStdName] = useState('');
    const [stdFname, setStdFname] = useState("");
    const [stdMothername, setStdMothername] = useState("");
    const [stdGender, setStdGender] = useState("");
    const [stdClass, setStdClass] = useState("");
    const [stdAddress, setStdAddress] = useState("");
    const [stdFee, setStdFee] = useState();
    const [dob, setDob] = useState("");
    const [aadharNumber, setAadharNumber] = useState();
    const [castNumber, setCastNumber] = useState("");
    const [birthCertificate, setBirthCertificate] = useState("");
    const [incomeProof, setIncomeProof] = useState("");
    const [previousClass, setPreviousClass] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [previousClassRollNumber, setPreviousClassRollNumber] = useState("");
    const [RegistrationAmount, setRegistrationAmount] = useState()
    let stdId;
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (verifyTransactionIdFlag) {
                await generateStudentId();
                if (stdId) {
                    let response = await axios.post(api.URL_S + api.STUDENT_REGISTRATION, { stdId, aadharNumber, castNumber, stdAddress, stdClass, stdFee, stdFname, stdGender, stdId, stdMothername, stdName, dob, birthCertificate, incomeProof, previousClass, previousClassRollNumber, transactionId, fee: RegistrationAmount });
                    toast.success("Registration Successfuly.......");
                }
            } else
                toast.error("transaction id not valid....");
        } catch (err) {
            if (err.response && err.response.status === 400)
                toast.error("already registered....");
            else if (err.response && err.response.status === 500)
                toast.error("internal server error....");
        }
    };

    const generateStudentId = () => {
        try {
            let namePrefix = stdName.substring(0, 2).toUpperCase();
            let randomDigits = Math.floor(1000 + Math.random() * 9000);
            let studentClass;
            if (stdClass === "First")
                studentClass = '01';
            else if (stdClass === "Second")
                studentClass = '02';
            else if (stdClass === "Third")
                studentClass = '03';
            else if (stdClass === "Fourth")
                studentClass = '04';
            else
                studentClass = '05';
            let studentId = namePrefix + randomDigits + studentClass;
            stdId = studentId;
        } catch (error) {
            console.error("An error occurred: " + error);
        }
    };
    const setStudentFees = async () => {
        try {
            let response = await axios.post(api.URL_S + api.FETCH_CLASS_FEE, { className: stdClass });
            setStdFee(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }
    const verifyTransactionId = async () => {
        try {
            let response = await axios.post(api.URL_S + api.VERIFY_TRANSACTION_ID, { transactionId: transactionId });
            setRegistrationAmount(response.data.result);
            if (response) {
                let response1 = await axios.post(api.URL_S + api.CHECKALREADYTRANSACTIONID, { transactionId: transactionId });
                setVerifyTransactionIdFlag(true);
            }
        }
        catch (err) {
            setVerifyTransactionIdFlag(false);
        }
    }
    return <>
        <ToastContainer />
        <Navbaar />
        <form onSubmit={handleSubmit}>
            <div className="outDiv">
                <h2 className="heading">Mount Carmal School Addmission Form</h2>
            </div>
            <div className="mt-2 p-5">
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>FullName</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setStdName(event.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Father Name</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setStdFname(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5" style={{ marginTop: "-8vw" }}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Mother Name</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setStdMothername(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>stdGender</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setStdGender(event.target.value) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5" style={{ marginTop: "-8vw" }}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Class</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onBlur={setStudentFees} onChange={(event) => { setStdClass(event.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Adress</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setStdAddress(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5" style={{ marginTop: "-8vw" }}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Date of birth</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setDob(event.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Aadhar no.</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setAadharNumber(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5" style={{ marginTop: "-8vw" }}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Cast certificate no.</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setCastNumber(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Birth certificate no.</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setBirthCertificate(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5" style={{ marginTop: "-8vw" }}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Fee</label>
                            </div>
                            <div className="col-6">
                                <input type='text' readOnly value={stdFee} onChange={(event) => { setStdFee(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Income proof</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setIncomeProof(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5" style={{ marginTop: "-8vw" }}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Previous class</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setPreviousClass(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Previous class roll no.</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onChange={(event) => { setPreviousClassRollNumber(event.target.value) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5" style={{ marginTop: "-8vw" }}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Transaction Id</label>
                            </div>
                            <div className="col-6">
                                <input type='text' onBlur={verifyTransactionId} onChange={(event) => { setTransactionId(event.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label>Registration Amount</label>
                            </div>
                            <div className="col-6">
                                <input type='text' readOnly value={RegistrationAmount} onChange={(event) => { setRegistrationAmount(event.target.value) }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div><button style={{ width: "90%", marginLeft: "5vw", marginRight: "5vw" }} type='submit' className='btn btn-success'>Submit</button></div>
        </form>
    </>
}
export default AdmissionProcess;
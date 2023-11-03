import axios from "axios";
import { useState } from "react"
import Navbaar from "../Navbar/navbar";
import api from "../WebApi/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function FeesCOllection() {
    const [studentId, setStudentId] = useState("");
    const [feeAmount, setFeeAmount] = useState(0);
    const [transactionId, setTransactionId] = useState("");
    const [transactionVerifyFlag, setTransactionVerifyFlag] = useState(false)
    const verifyFromAccount = async () => {
        try {
            let response = await axios.post(api.URL_S + api.VERIFY_TRANSACTION_ID, { transactionId: transactionId });
            setFeeAmount(response.data.result);
            setTransactionVerifyFlag(true);
            return true;
        } catch (err) {
            setTransactionVerifyFlag(false);
        }
    }
    const submitButton = async () => {
        if (transactionVerifyFlag)
            try {
                const response = await axios.post(api.URL_S + api.STUDENT_FEE, { stdId: studentId, fee: feeAmount, transactionId: transactionId, paymentMode: "online" })
                toast.success("Successfully Fee Collect..");

            } catch (err) {
                console.log(err)
                if (err.response.status == 400) 
                  toast.error("Transaction id used....");
                
                else if (err.response.status == 410)
                    toast.error("Transaction id not valid....");
                else
                    toast.error("internal server error....");
            }
    }
    return <>
        <ToastContainer />
        <Navbaar />
        <div>
            <div>
                <h1 className="text-center">Throught Technology</h1>

                <h1 className="text-center">Fees Collection</h1>
            </div>
            <div className="row">
                <div className="col-md-6 text-end">
                    <label>Student Id</label>
                </div>
                <div className="col-md-6">
                    <input onChange={(event) => setStudentId(event.target.value)} type="text" placeholder="enter student id" />
                </div>
            </div>
            <div className="row m-2">
                <div className="col-md-6 text-end">
                    <label>Transaction Id</label>
                </div>
                <div className="col-md-6">
                    <input onBlur={() => verifyFromAccount()} onChange={(event) => setTransactionId(event.target.value)} type="text" placeholder="enter Transaction Id" />
                </div>
            </div>
            <div className="row m-2">
                <div className="col-md-6 text-end">
                    <label>Fee Amount</label>
                </div>
                <div className="col-md-6">
                    <input readOnly value={feeAmount} onChange={(event) => setFeeAmount(event.target.value)}  placeholder="enter fee amount" />
                </div>
            </div>
            <div className="text-center mt-4">
                <button onClick={() => submitButton()}>Submit</button>
            </div>
        </div>
    </>
}
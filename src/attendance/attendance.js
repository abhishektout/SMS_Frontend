import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../WebApi/api";
import Navbaar from "../Navbar/navbar";

<style>
    .container1{
    }
</style>

export function Attendance() {
    const [stdId, setStdId] = useState("");
    const [month, setMonth] = useState("");
    const [present, setPresent] = useState("");
    const [absent, setAbsent] = useState("");
    const submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(api.URL_S + api.STUDENT_ATTENDANCE, { stdId, month, presentDay: present, absentDay: absent, totalDay: present * 1 + absent * 1 })
            if (response.data.status) {
                toast.success("Attendace send successfully....");
            }
            else {
                return response.status(500).json({ message: "Internal server error", status: false });
            }
        } catch (err) {
            toast.error("Something went wrong....");
        }
    }
    return <>
        <ToastContainer />
        <Navbaar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',paddingLeft:"14vw",paddingRight:"14vw" }}>
            <div
                className="container"
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5vw',
                    maxWidth: '100%',
                    margin: '0 auto',
                }}
            >
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={submitForm}>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    fontSize: '24px',
                                }}
                            >
                                Attendance Form
                            </h2>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    className="input"
                                    onChange={(event) => setStdId(event.target.value)}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                    required
                                    placeholder="Student ID"
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    className="input"
                                    onChange={(event) => setMonth(event.target.value)}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                    required
                                    placeholder="Month"
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    className="input"
                                    onChange={(event) => setPresent(event.target.value)}
                                    min={1}
                                    max={26}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                    required
                                    placeholder="Present Day"
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    className="input"
                                    onChange={(event) => setAbsent(event.target.value)}
                                    min={1}
                                    max={26}
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                    required
                                    placeholder="Absent Day"
                                />
                            </div>
                            <button
                                className="btn btn-success "
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                }}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>
}
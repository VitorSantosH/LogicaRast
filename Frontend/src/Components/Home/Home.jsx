import React from "react";
import { useState, useEffect } from "react";
import connect from "../../Api/connect";
import "./Home.css";
import EditImg from "../../assets/EditIcon.svg";
import EditUserModal from '../EditarUser/EditUserModal'
import Modal from 'react-modal';

const Home = (props) => {

    const [state, setState] = useState({
        loaded: false,
        users: [],
        user: {}
    })
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {

        if (!state.loaded && !loading) {
            getUsers();
        }

    }, [])

    const getUsers = async (props) => {

        if (state.loaded) return;

        try {
            let ret = await connect.getUsers(state)
            console.log(ret)

            let NewUsers = state.users
            NewUsers.push(...ret)

            return setState(prevState => ({
                ...prevState,
                loaded: true,
                users: NewUsers
            }))

        } catch (error) {

            return setState(prevState => ({
                ...prevState,
                loaded: true,
            }))

        } finally {
            setLoading(true)
        }


    }

    const CreatUsersCards = () => {
        let container = [];

        for (let index = 0; index < state.users.length; index++) {

            let user = state.users[index];

            if (user.id != null && user.id != "") {
                let card = (
                    <div className="card" key={user.id + "" + index}>
                        <div className="containerIcon">
                            <div
                                onClick={async e => EditCard(user)}>
                                <img src={EditImg} alt="" />
                            </div>
                        </div>
                        <h3>{user.first_name}</h3>
                        <img src={user.avatar} alt="" />
                        <p>{user.id}</p>
                    </div>
                )

                container.push(card)

            }
        }

        return container;

    }

    const EditCard = async (user) => {

        if (user.id) {
            setState(prevState => ({
                ...prevState,
                user: user
            }))

            openModal();
        }

    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <div className="Home"
        >
            <h1
                onClick={e => {
                    console.log(state)
                }}>
                Home
            </h1>
            <EditUserModal user={state.user} isOpen={modalIsOpen} closeModal={closeModal} />
            <div className="listUsers">
                {state.users.length > 0 && (
                    CreatUsersCards()
                )}
            </div>


        </div>
    )
}



export default Home;
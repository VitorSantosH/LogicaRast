import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import connect from "../../Api/connect";
import Swal from "sweetalert2";
// Estilo customizado para o modal


const EditUserModal = ({ user, isOpen, closeModal }) => {

    if (!user) {
        return (<div></div>)
    }
    const [modalIsOpen, setModalIsOpen] = useState(isOpen);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleCloseModal = () => {
        setModalIsOpen(false);
        closeModal();
    };

    const handleChange = (e) => {

        console.log(editedUser)
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {

        setEditedUser({
            ...user
        })

        setModalIsOpen(isOpen)

    }, [isOpen, user])

    const Salvar = async (e) => {

        e.preventDefault();
        let ret = await connect.EditUser(editedUser)
        console.log(ret)

        if (ret.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Usuário editado'
            }).then(() => {
                window.location.reload();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro inesperado.'
            });
        }


    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className='modal'
            contentLabel="Editar Usuário"
        >
            <div className="btnFechar">
                <button onClick={handleCloseModal}>Fechar</button>
            </div>
            <h2>Detalhes do Usuário</h2>
            <form >
                <div>
                    <label>ID: {editedUser.id} </label>

                </div>
                <div>
                    <label>Nome Completo:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={editedUser.first_name || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={editedUser.last_name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Nome de Usuário:</label>
                    <input
                        type="text"
                        name="username"
                        value={editedUser.username || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={editedUser.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Gênero:</label>
                    <input
                        type="text"
                        name="gender"
                        value={editedUser.gender || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={editedUser.date_of_birth || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={editedUser.phone_number || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Endereço:</label>
                    <input
                        type="text"
                        name="street_address"
                        value={editedUser.address_street_address || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        value={editedUser.address_city || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="state"
                        value={editedUser.address_state || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="country"
                        value={editedUser.address_country || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Código Postal:</label>
                    <input
                        type="text"
                        name="zip_code"
                        value={editedUser.address_zip_code || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Profissão:</label>
                    <input
                        type="text"
                        name="title"
                        value={editedUser.employment_title || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Competência Chave:</label>
                    <input
                        type="text"
                        name="key_skill"
                        value={editedUser.employment_key_skill || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Número do Cartão de Crédito:</label>
                    <input
                        type="text"
                        name="cc_number"
                        value={editedUser.credit_card_cc_number || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plano de Assinatura:</label>
                    <input
                        type="text"
                        name="plan"
                        value={editedUser.subscription_plan || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Status da Assinatura:</label>
                    <input
                        type="text"
                        name="status"
                        value={editedUser.subscription_status || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Método de Pagamento:</label>
                    <input
                        type="text"
                        name="payment_method"
                        value={editedUser.subscription_payment_method || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Prazo da Assinatura:</label>
                    <input
                        type="text"
                        name="term"
                        value={editedUser.subscription_term || ""}
                        onChange={handleChange}
                    />
                </div>


                <div className="containerSalvar">
                    <button type="submit"
                        onClick={async e => { Salvar(e) }}>Salvar</button>
                </div>
            </form>

        </Modal>

    );
};

export default EditUserModal;



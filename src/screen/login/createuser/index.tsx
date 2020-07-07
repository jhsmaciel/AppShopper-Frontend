import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { showMessage } from 'react-native-flash-message';

import { postUser, UserForm } from '../../../service/user';
import { Header } from '../../../component/header';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../component/text';
import { Input, InputPassword } from '../../../component/Input';
import { DatePicker } from '../../../component/datepicker';
import { Button } from '../../../component/button';

const CreateUser = ({ navigation }: { navigation: any}) => {

    const [nascimento, setNascimento] = useState<Moment>(moment());
    const [userObject, setUserObject] = useState<UserForm>({
        email: '',
        name: '',
        nascimento,
        senha: ''
    });

    async function _handleSubmit() {
        try {
            if(userObject.senha.length < 6) {
                throw new Error("A senha tem que ser no mínimo de 6 caracteres!")
            }
            await postUser({
                email: userObject.email,
                name: userObject.name,
                nascimento: nascimento,
                senha: userObject.senha,
            });
            showMessage({
                message: "Dados alterados com sucesso!",
                type: 'success'
            })
        } catch (error) {
            showMessage({
                message: error.message,
                type: 'danger'
            })
        }
    }
    
    return (
        <>
            <Header onPressBack={navigation.goBack} label="Cadastro"/>
            <View
                style={styles.content}
            >
                <Text size="big" style={{ textAlign: 'center' }}>Bem vindo!</Text>
                <View
                    style={styles.viewInputs}
                >
                    <Input 
                        value={userObject.name}
                        label="Nome completo"
                        onChange={(value) => setUserObject({
                            ...userObject,
                            name: value
                        })}
                    />
                    <Input 
                        value={userObject.email}
                        label="Email"
                        onChange={(value) => setUserObject({
                            ...userObject,
                            email: value
                        })}
                    />
                    <InputPassword 
                        label="Nova senha"
                        value={userObject.senha}
                        onChange={(value) => setUserObject({
                                ...userObject,
                                senha: value
                            })
                        }
                    />
                    <DatePicker
                        onChange={setNascimento}
                        value={nascimento}
                    />
                </View>
                <Button
                    onPress={_handleSubmit}
                >
                    Salvar
                </Button>
            </View>
        </>
    );
}

export default CreateUser

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 15,
        paddingTop: 15,
        flex: 1,
        justifyContent: 'space-evenly',
    },
    viewInputs: {
        height: '60%',
        justifyContent: 'space-evenly',
    },

})
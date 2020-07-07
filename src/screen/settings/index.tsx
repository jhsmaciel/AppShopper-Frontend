import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { Button } from '../../component/button'
import { useAuthentication, User } from '../../context/LoginContext';
import { Header } from '../../component/header';
import { View, StyleSheet } from 'react-native';
import { Input, InputPassword } from '../../component/Input';
import { Text } from '../../component/text';
import { putUser } from '../../service/user';
import { showMessage } from 'react-native-flash-message';
import { DatePicker } from '../../component/datepicker';

interface UserObject extends User {
    senha: string,
}

const Settings = ({ navigation }: { navigation: any}) => {
    const { user, setUser } = useAuthentication();
    const [userObject, setUserObject] = useState<UserObject>({ ...user, senha: '' } as UserObject);
    const [nascimento, setNascimento] = useState<Moment>(moment(user.nascimento));

    async function _handleSubmit() {
        try {
            if(userObject.senha.length < 6) {
                throw new Error("A senha tem que ser no mínimo de 6 caracteres!")
            }
            await putUser(userObject.id, {
                email: userObject.email,
                name: userObject.name,
                nascimento: nascimento,
                senha: userObject.senha,
            });
            setUser({
                id: userObject.id,
                email: userObject.email,
                name: userObject.name,
                nascimento: nascimento,
            })
            showMessage({
                message: "Usuário cadastrado com sucesso!",
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
            <Header onPressBack={navigation.goBack} label="Configurações"/>
            <View
                style={styles.content}
            >
                <Text size="big" style={{ textAlign: 'center' }}>Atualizar dados da conta</Text>
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
                        })}
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

export default Settings



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
import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { postUser, UserForm } from '../../../service/user';
import { Header } from '../../../component/header';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../component/text';
import { Input, InputPassword, Field } from '../../../component/Input';
import { DatePicker } from '../../../component/datepicker';
import { Button } from '../../../component/button';

const FormSchemaUser = Yup.object().shape({
    email: Yup.string()
        .required("E-mail é obrigatório!"),
    name: Yup.string()
        .min(4, "O nome deve ter no mínimo 4 carateres!")
        .required("O nome é obrigatório!"),
    nascimento: Yup.string()
        .required(),
    senha: Yup.string()
        .min(6, "A senha deve ter no mínimo 6 carateres!")
        .required("A senha é obrigatória!"), 
})

export const FormValidateContext = React.createContext({});

const CreateUser = ({ navigation }: { navigation: any}) => {
    return (
        <>
            <Header onPressBack={navigation.goBack} label="Cadastro"/>                
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    nascimento: moment(),
                }}
                
                onSubmit={(data) => console.log(data)}
                validationSchema={FormSchemaUser}
            >
                {
                    ({ handleSubmit, values, isSubmitting, handleBlur, handleChange }) => {
                        return (
                            <View
                                style={styles.content}
                            >
                                <Text size="big" style={{ textAlign: 'center' }}>Bem vindo!</Text>
                                <View
                                    style={styles.viewInputs}
                                >
                                    <Field 
                                        label="Nome completo"
                                        onChange={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        name='name'

                                    />
                                    <Field
                                        label="Email"
                                        onChange={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        name='email'
                                        
                                    />
                                    <DatePicker
                                        onChange={handleChange('nascimento')}
                                        onBlur={handleBlur('nascimento')}
                                        value={values.nascimento}
                                    />
                                </View>
                                <Button
                                    onPress={handleSubmit}
                                    disabled={isSubmitting}
                                    >
                                    Salvar
                                </Button>
                            </View>
                        );
                    }
                }
            </Formik>
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
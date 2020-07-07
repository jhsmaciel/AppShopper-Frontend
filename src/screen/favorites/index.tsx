import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import IconMI from 'react-native-vector-icons/MaterialIcons'
import { showMessage } from 'react-native-flash-message';

import { Header } from '../../component/header';
import { styles } from '../styles';
import { Text } from '../../component/text';
import { colors } from '../../config';
import { useFavorites } from '../../context/FavoritesContext';
import { Input } from '../../component/Input';
import { deleteFavorite, Favorite } from '../../service/favorite';
import { useAuthentication } from '../../context/LoginContext';

const Favorites = ({ navigation }: { navigation: any}) => {
    const [search, setSearch] = useState<string>('');
    const { favorites, setFavorites } = useFavorites();
    const { user } = useAuthentication();

    async function _handleDeleteFavorite(favorite: Favorite) {
        try {
            await deleteFavorite(user.id, favorite.id);
            setFavorites(favorites.filter(favo => favo.full_name !== favorite.full_name))
        } catch (error) {
            showMessage({
                message: "Não foi possível desfavoritar o item!",
                type: "danger"
            })
        }
    }
    
    return (
        <>
            <Header label="Listagem de favoritos" onPressBack={navigation.goBack} onPressRightIcon={() => navigation.navigate("Settings")} />
            <View
                style={styles.background}
            >
                <View 
                    style={styles.content} 
                >
                    <View 
                        style={{ ...styles.inputSearch, width: '100%'}}
                    >
                        <Input onChange={setSearch} value={search} placeholder="Digite o nome do repositório"/>
                    </View>
                    <FlatList
                        style={{
                            width: '100%'
                        }}
                        data={
                            favorites
                                ?.filter(favorite => favorite.full_name.toLowerCase().includes(search.toLowerCase()))
                        }
                        keyExtractor={(item) => item.full_name }
                        renderItem={({ item }) => {
                            return (
                                <View
                                    style={styles.viewMainRepo}
                                >
                                    <View 
                                        style={styles.viewRepo}
                                    >
                                        <Text>{item.full_name}</Text>
                                        <IconMI
                                            name="favorite" 
                                            size={20} 
                                            color={colors.primary}
                                            onPress={() => _handleDeleteFavorite(item) }
                                        />
                                    </View>
                                    <View
                                        style={styles.viewRepo}
                                    >
                                        <Text size="small" color={colors.dark}>{item.description}</Text>
                                    </View>
                                </View>
                            );
                        }} 
                    />
                </View>
            </View>
        </>
    );
}

export default Favorites

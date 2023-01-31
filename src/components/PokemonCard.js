import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import getColorByPokemonType from '../utils/getColorByPokemonType';


export default function PokemonCard(props) {
    const { pokemon } = props
    const navigation = useNavigation();

    const pokemonColor = getColorByPokemonType(pokemon.type);
    const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles }

    const goToPokemon = () => {
        //console.log(`Vamos al pokemon: ${pokemon.id}`);
        navigation.navigate("Pokemon", { id: pokemon.id });

    };
    //console.log('estas son las props...', pokemon)

    return (
        <TouchableWithoutFeedback onPress={goToPokemon}>
            <View style={styles.card}>
                <View style={styles.spacing}>
                    <View style={bgStyles}>
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Image source={{ uri: pokemon.image }} style={styles.image} />
                        <View style={styles.pill}>
                            <Text style={styles.move}>#{`${pokemon.order}`.padStart(3, 0)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 130,
    },
    spacing: {
        flex: 1,
        padding: 5,
    },
    bgStyles: {
        flex: 1,
        borderRadius: 15,
        padding: 5,
    },
    number: {
        position: "absolute",
        right: 10,
        top: 13,
        color: "#fff",
        fontSize: 13,
    },
    name: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 2,
        textTransform: 'capitalize',
        alignSelf: 'center',
    },
    image: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 90,
        height: 90,
    },
    type: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10,
        paddingLeft: 10,
        textDecorationLine: 'underline',
        textTransform: 'capitalize',
    },
    move: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        textTransform: 'capitalize',
        paddingHorizontal: 25,
        marginTop: 60,

    },
});
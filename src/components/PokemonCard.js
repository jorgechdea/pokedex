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
                        <Text style={styles.number}>
                            #{`${pokemon.order}`.padStart(3, 0)}
                        </Text>
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Image source={{ uri: pokemon.image }} style={styles.image} />
                        <Text style={styles.type}>{pokemon.type}</Text>
                        <View style={styles.pill}>
                            <Text style={styles.move}>{pokemon.move}</Text>
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
        fontSize: 16,
        paddingTop: 6,
        textTransform: 'capitalize',
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
        fontSize: 8,
        textTransform: 'capitalize',
        paddingHorizontal: 6,
        marginTop: 58,

    },
});
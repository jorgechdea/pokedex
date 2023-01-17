import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import getColorByPokemonType from '../../utils/getColorByPokemonType'

export default function Type(props) {
    const { types } = props

    const typo = types.map(({ type: { name } }) => name)

    return (
        <View style={styles.content}>

            {typo.map((t) =>
                <View key={t} style={{ ...styles.pill, backgroundColor: getColorByPokemonType(t) }}>
                    <Text style={styles.typetext} >{t}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pill: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 40,
        marginHorizontal: 10,
    },
    typetext: {
        textTransform: 'capitalize',
        color: '#f4f4f4'
    }
})
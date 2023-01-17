import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Stats(props) {
    const { stats, moves } = props;



    const basestats = stats.map(({ stat: { name }, base_stat }) => {
        return [name, base_stat]
    })


    const move = moves.map(({ move: { name } }) => name);
    const lastmoves = move.slice(-5);
    //console.log('moves....', lastmoves)

    return (
        <View style={styles.content}>
            <View style={styles.statscard}>
                <Text style={styles.stattitle}>Stats</Text>
                {basestats.map((t) =>
                    <View key={t} style={styles.block}>
                        <Text style={styles.typetext} >{t[0]}</Text>
                        <Text>{t[1]}</Text>
                    </View>
                )}
            </View>
            <View style={styles.movescard}>
                <Text style={styles.movestitle}>Moves</Text>
                {lastmoves.map((m) =>
                    <View key={m} style={styles.moves}>
                        <View style={styles.pill}>
                            <Text style={styles.movetext} >{m}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 15,
        marginTop: 20,
        flexDirection: 'row',
    },
    stattitle: {
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    statscard: {
        marginBottom: 20,
        width: 175,

    },
    typetext: {
        textTransform: 'capitalize',
        marginRight: 10,
        color: '#6b6b6b'
    },
    block: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: '#BBBBBB',
        borderWidth: 1,
    },
    movescard: {
        marginBottom: 10,
        alignItems: 'center',

    },
    movestitle: {
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    moves: {
        paddingVertical: 5,
        marginHorizontal: 20,
        width: '90%',
        justifyContent: 'center',
    },
    pill: {
        marginLeft: 3,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#DBDBDB',

    },
    movetext: {
        textTransform: 'capitalize',
        paddingHorizontal: 4,
    },

})
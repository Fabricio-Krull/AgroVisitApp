import { StyleSheet, Text, View } from 'react-native';

import MapPin from 'lucide-react-native/icons/map-pin';
import Phone from 'lucide-react-native/icons/phone';
import Camera from 'lucide-react-native/icons/camera';
import Siren from 'lucide-react-native/icons/siren';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Olá! Este é o meu aplicativo utilizando os recursos nativos do dispositivo.
        </Text>

        <Text style={styles.text}>
            Nessa seção, você vai entender melhor os recursos que cada seção utiliza, e quais são as suas finalidades.
        </Text>

        <View style={styles.section}>
          <MapPin color={'#aacc74'} size={40}/>
          <Text style={styles.text}>A seção de Geolocalização Global utiliza dos recursos de posição geográfica do dispositivo para conseguir localizar o posicionamento do aparelho utilizando o sistema altitude e longitude.
          </Text>
        </View>

        <View style={styles.section}>
          <Phone color={'#aacc74'} size={40}/>
          <Text style={styles.text}>A seção de Contatos usa do recurso de contatos salvos do telefone. Ao garantir permissão ao aplicativo, o sistema acessa os contatos, e os lista, exibindo o nome e o número de telefone de cada um dos contatos encontrados.
          </Text>
        </View>

        <View style={styles.section}>
          <Camera color={'#aacc74'} size={40}/>
          <Text style={styles.text}>A seção da Galeria utiliza o recurso de acesso à galeria do dispositivo. Ao garantir acesso a galeria do aparelho, o aplicativo consegue exibir uma imagem selecionada por vez.
          </Text>
        </View>

        <View style={styles.section}>
          <Siren color={'#aacc74'} size={40}/>
          <Text style={styles.text}>A seção de Sensores acessa o recurso de sensores de aceleração e orientação do dispositivo. Com o acesso, o aplicativo consegue detectar a movimentação do aparelho usando cálculos para o acelerômetro e o giroscópio, podendo detectar movimentos bruscos com o dispositivo.
          </Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  text: {color: '#ffffff'},
  section: {flexDirection: 'row', alignItems: 'center', gap: 10}
});

import { FlatList, View, StyleSheet, Image } from 'react-native'
import Text from './Text'
import theme from '../theme'
import DetailsInNumbers from './DetailsInNumbers'
const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    gap: 15,
    backgroundColor: '#fff'
  },
  repoContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around'
  },
  ownerContainer: {
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingRight: 10
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 15
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: '#fff',
    padding: 5,
    maxWidth: 100,
    borderRadius: 5,
    textAlign: 'center'
  },
  countDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20
  }
})
const RepositoryItem = ({ repositories }) => {
  const {
    fullName,
    language,
    description,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    stargazersCount
  } = repositories.item

  return (
    <View style={styles.container}>
      <View style={styles.repoContent}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.ownerContainer}>
          <Text fontWeight='bold' color='textPrimary'>
            Full name: {fullName}
          </Text>
          <Text color='textSecondary'>Description: {description}</Text>

          <Text style={styles.language} color='textSecondary'>
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.countDetails}>
        <DetailsInNumbers name={'Stars'} count={stargazersCount} />
        <DetailsInNumbers name={'Forks'} count={forksCount} />
        <DetailsInNumbers name={'Reviews'} count={reviewCount} />
        <DetailsInNumbers name={'Rating'} count={ratingAverage} />
      </View>
    </View>
  )
}
export default RepositoryItem

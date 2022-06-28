function generate_shorturl(){
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const union = (lowerCaseLetters + upperCaseLetters + numbers).split('')
  let url = ''
  for (let i = 0; i < 5; i++){
    url += sample(union)
  }  
  return (url)
}
function sample(union){
  const character = union[Math.floor(Math.random() * union.length)]
  return character
}
module.exports = generate_shorturl
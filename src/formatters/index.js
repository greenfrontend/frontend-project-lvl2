import recursive from './recursive';
import plane from './plane'

export default (ast, format) => {
  if (format === 'recursive') {
    return recursive(ast)
  }
  if (format === 'plane') {
    return plane(ast)
  }
  return null
}

import unittest

# Função que soma dois números
def soma(a, b):
    return a + b

# Classe de teste para a função soma
class TestSoma(unittest.TestCase):
    
    # Teste para verificar se a soma de dois números positivos está correta
    def test_soma_positivos(self):
        self.assertEqual(soma(3, 5), 8)
    
    # Teste para verificar se a soma de um número positivo e um número negativo está correta
    def test_soma_positivo_negativo(self):
        self.assertEqual(soma(10, -3), 7)
    
    # Teste para verificar se a soma de dois números negativos está correta
    def test_soma_negativos(self):
        self.assertEqual(soma(-5, -7), -12)

# Executar os testes e imprimir o resumo
if __name__ == '__main__':
    unittest.main(argv=[''], exit=False)

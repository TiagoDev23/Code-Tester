def soma(a, b):
    return a + b

# Solicita ao usuário para inserir dois números
numero1 = float(input("Digite o primeiro numero: "))
numero2 = float(input("Digite o segundo numero: "))

# Calcula a soma usando a função soma
resultado = soma(numero1, numero2)

# Exibe o resultado
print("A soma de", numero1, "e", numero2, "é igual a", resultado)
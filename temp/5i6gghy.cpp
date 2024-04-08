#include <iostream>

int main() {
    // Declaração das variáveis
    int num1, num2, soma;

    // Solicita ao usuário para inserir dois números
    std::cout << "Digite o primeiro número: ";
    std::cin >> num1;

    std::cout << "Digite o segundo número: ";
    std::cin >> num2;

    // Calcula a soma
    soma = num1 + num2;

    // Imprime a soma
    std::cout << "A soma de " << num1 << " e " << num2 << " é: " << soma << std::endl;

    return 0;
}

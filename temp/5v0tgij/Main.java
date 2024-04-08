public class Soma {
    public static void main(String[] args) {
        // Definindo os números a serem somados
        int numero1 = 10;
        int numero2 = 5;
        
        // Calculando a soma dos números
        int resultado = soma(numero1, numero2);
        
        // Exibindo o resultado
        System.out.println("A soma de " + numero1 + " e " + numero2 + " é igual a " + resultado);
    }
    
    // Método para calcular a soma de dois números
    public static int soma(int a, int b) {
        return a + b;
    }
}

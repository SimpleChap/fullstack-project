package Main;

public class Main {

    public static void main(String[] args) {

        Bank bank = new Bank();

        System.out.println("Welcome to M Bank");

        bank.seedData();

        User loggedInUser = bank.login();

        if (loggedInUser == null) {
            System.out.println("Invalid username or password.");
        } else if (loggedInUser instanceof Admin) {
            AdminDashboard.show(bank);
        } else if (loggedInUser instanceof Customer) {
            CustomerDashboard.show(bank, (Customer) loggedInUser);
        }

        System.out.println("Thank you for using M Bank.");
    }
}
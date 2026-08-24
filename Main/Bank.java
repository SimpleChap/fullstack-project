package Main;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Bank {

    int counter = 1;
    int accountCounter = 1004;
    Scanner scanner = new Scanner(System.in);
    List<User> users = new ArrayList<>();
    List<Customer> customers = new ArrayList<>();

    public Bank() {

    }

    public void seedData() {

        Admin admin = new Admin(counter++, "Bank Manager", "admin", "admin123");
        Customer customer1 = new Customer(counter++, "Mit", "mit", "mit123");
        Customer customer2 = new Customer(counter++, "Tim", "tim", "tim123");

        SavingsAccount mitSavings = new SavingsAccount(1001, 2000);
        CheckingAccount mitChecking = new CheckingAccount(1002, 500);
        SavingsAccount timSavings = new SavingsAccount(1003, 1500);

        customer1.addAccount(mitSavings);
        customer1.addAccount(mitChecking);
        customer2.addAccount(timSavings);

        users.add(admin);
        users.add(customer1);
        users.add(customer2);

        customers.add(customer1);
        customers.add(customer2);
    }

    public User login() {

        System.out.print("Enter username: ");
        String userName = scanner.nextLine().trim();

        System.out.print("Enter password: ");
        String enteredPassword = scanner.nextLine().trim();

        for (User user : users) {
            if (user.username.equals(userName) && user.password.equals(enteredPassword)) {
                return user;
            }
        }

        return null;
    }
}

abstract class User {

    int id;
    String name;
    String username;
    String password;

    public User(int id, String name, String username, String password) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
    }
}

class Admin extends User {

    public Admin(int id, String name, String username, String password) {
        super(id, name, username, password);
    }
}

class Customer extends User {

    List<Account> accounts = new ArrayList<>();

    public Customer(int id, String name, String username, String password) {
        super(id, name, username, password);
    }

    public void addAccount(Account account) {
        accounts.add(account);
    }
}

interface AccountOperations {
    void deposit(double amount);
    boolean withdraw(double amount);
}

abstract class Account {

    int accountNumber;
    double balance;

    public Account(int accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
}

class SavingsAccount extends Account implements AccountOperations {

    public SavingsAccount(int accountNumber, double balance) {
        super(accountNumber, balance);
    }

    @Override
    public void deposit(double amount) {
        balance = balance + amount;
        System.out.println("Deposit successful.");
    }

    @Override
    public boolean withdraw(double amount) {
        if (amount <= balance) {
            balance = balance - amount;
            System.out.println("Withdrawal successful.");
            return true;
        }

        System.out.println("Insufficient balance. No overdraft allowed.");
        return false;
    }
}

class CheckingAccount extends Account implements AccountOperations {

    public CheckingAccount(int accountNumber, double balance) {
        super(accountNumber, balance);
    }

    @Override
    public void deposit(double amount) {
        balance = balance + amount;
        System.out.println("Deposit successful.");
    }

    @Override
    public boolean withdraw(double amount) {
        balance = balance - amount;
        System.out.println("Withdrawal successful.");
        return true;
    }
}
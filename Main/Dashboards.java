package Main;

class AdminDashboard {

    public static void show(Bank bank) {

        int choice;

        do {
            System.out.println("\nAdmin Dashboard");
            System.out.println("1. View all customers");
            System.out.println("2. View all accounts");
            System.out.println("3. Add customer");
            System.out.println("4. Update customer");
            System.out.println("5. Delete customer");
            System.out.println("6. Add account");
            System.out.println("7. Update account");
            System.out.println("8. Delete account");
            System.out.println("9. Logout");
            System.out.print("Choose an option: ");

            choice = bank.scanner.nextInt();

            switch (choice) {
                case 1:
                    viewAllCustomers(bank);
                    break;
                case 2:
                    viewAllAccounts(bank);
                    break;
                case 3:
                    addCustomer(bank);
                    break;
                case 4:
                    updateCustomer(bank);
                    break;
                case 5:
                    deleteCustomer(bank);
                    break;
                case 6:
                    addAccount(bank);
                    break;
                case 7:
                    updateAccount(bank);
                    break;
                case 8:
                    deleteAccount(bank);
                    break;
                case 9:
                    System.out.println("Logging out.");
                    break;
                default:
                    System.out.println("Invalid option.");
            }

        } while (choice != 9);
    }

    public static void viewAllCustomers(Bank bank) {

        System.out.println("\nAll customers:");

        for (Customer customer : bank.customers) {
            System.out.println("ID: " + customer.id + " | Name: " + customer.name + " | Username: " + customer.username);
        }
    }

    public static void viewAllAccounts(Bank bank) {

        System.out.println("\nAll accounts:");

        for (Customer customer : bank.customers) {
            for (Account account : customer.accounts) {
                System.out.println("Customer: " + customer.name + " | Account: " + account.accountNumber + " | Balance: $" + account.balance);
            }
        }
    }

    public static void addCustomer(Bank bank) {

        bank.scanner.nextLine();

        System.out.print("Enter customer name: ");
        String name = bank.scanner.nextLine();

        System.out.print("Enter username: ");
        String username = bank.scanner.nextLine();

        System.out.print("Enter password: ");
        String password = bank.scanner.nextLine();

        Customer newCustomer = new Customer(bank.counter++, name, username, password);

        bank.users.add(newCustomer);
        bank.customers.add(newCustomer);

        System.out.println("Customer added successfully. Customer ID: " + newCustomer.id);
    }

    public static void updateCustomer(Bank bank) {

        System.out.print("Enter customer ID: ");
        int customerId = bank.scanner.nextInt();

        Customer customer = findCustomer(bank, customerId);

        if (customer == null) {
            System.out.println("Customer not found.");
            return;
        }

        bank.scanner.nextLine();

        System.out.print("Enter new name: ");
        customer.name = bank.scanner.nextLine();

        System.out.print("Enter new username: ");
        customer.username = bank.scanner.nextLine();

        System.out.print("Enter new password: ");
        customer.password = bank.scanner.nextLine();

        System.out.println("Customer updated successfully.");
    }

    public static void deleteCustomer(Bank bank) {

        System.out.print("Enter customer ID: ");
        int customerId = bank.scanner.nextInt();

        Customer customer = findCustomer(bank, customerId);

        if (customer == null) {
            System.out.println("Customer not found.");
            return;
        }

        bank.users.remove(customer);
        bank.customers.remove(customer);

        System.out.println("Customer deleted successfully.");
    }

    public static Customer findCustomer(Bank bank, int customerId) {

        for (Customer customer : bank.customers) {
            if (customer.id == customerId) {
                return customer;
            }
        }

        return null;
    }

    public static void addAccount(Bank bank) {

        System.out.print("Enter customer ID: ");
        int customerId = bank.scanner.nextInt();

        Customer customer = findCustomer(bank, customerId);

        if (customer == null) {
            System.out.println("Customer not found.");
            return;
        }

        System.out.println("1. Savings Account");
        System.out.println("2. Checking Account");
        System.out.print("Choose account type: ");
        int accountType = bank.scanner.nextInt();

        System.out.print("Enter starting balance: $");
        double balance = bank.scanner.nextDouble();

        if (balance < 0) {
            System.out.println("Starting balance cannot be negative.");
            return;
        }

        Account newAccount;

        switch (accountType) {
            case 1:
                newAccount = new SavingsAccount(bank.accountCounter++, balance);
                break;
            case 2:
                newAccount = new CheckingAccount(bank.accountCounter++, balance);
                break;
            default:
                System.out.println("Invalid account type.");
                return;
        }

        customer.addAccount(newAccount);
        System.out.println("Account added successfully. Account number: " + newAccount.accountNumber);
    }

    public static void updateAccount(Bank bank) {

        System.out.print("Enter account number: ");
        int accountNumber = bank.scanner.nextInt();

        for (Customer customer : bank.customers) {
            for (Account account : customer.accounts) {
                if (account.accountNumber == accountNumber) {
                    System.out.print("Enter new balance: $");
                    double newBalance = bank.scanner.nextDouble();

                    if (newBalance < 0 && account instanceof SavingsAccount) {
                        System.out.println("Savings account balance cannot be negative.");
                        return;
                    }

                    account.balance = newBalance;
                    System.out.println("Account updated successfully.");
                    return;
                }
            }
        }

        System.out.println("Account not found.");
    }

    public static void deleteAccount(Bank bank) {

        System.out.print("Enter account number: ");
        int accountNumber = bank.scanner.nextInt();

        for (Customer customer : bank.customers) {
            for (int i = 0; i < customer.accounts.size(); i++) {
                Account account = customer.accounts.get(i);

                if (account.accountNumber == accountNumber) {
                    customer.accounts.remove(i);
                    System.out.println("Account deleted successfully.");
                    return;
                }
            }
        }

        System.out.println("Account not found.");
    }
}

class CustomerDashboard {

    public static void show(Bank bank, Customer customer) {

        int choice;

        do {
            System.out.println("\nWelcome, " + customer.name);
            System.out.println("1. View my accounts");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Transfer");
            System.out.println("5. Logout");
            System.out.print("Choose an option: ");

            choice = bank.scanner.nextInt();

            switch (choice) {
                case 1:
                    viewCustomerAccounts(customer);
                    break;
                case 2:
                    deposit(bank, customer);
                    break;
                case 3:
                    withdraw(bank, customer);
                    break;
                case 4:
                    transfer(bank, customer);
                    break;
                case 5:
                    System.out.println("Logging out.");
                    break;
                default:
                    System.out.println("Invalid option.");
            }

        } while (choice != 5);
    }

    public static void viewCustomerAccounts(Customer customer) {

        System.out.println("\nYour accounts:");

        for (Account account : customer.accounts) {
            System.out.println("Account number: " + account.accountNumber + " | Balance: $" + account.balance);
        }
    }

    public static void deposit(Bank bank, Customer customer) {

        System.out.print("Enter account number: ");
        int enteredAccountNumber = bank.scanner.nextInt();

        System.out.print("Enter deposit amount: $");
        double amount = bank.scanner.nextDouble();

        for (Account account : customer.accounts) {
            if (account.accountNumber == enteredAccountNumber) {
                if (amount <= 0) {
                    System.out.println("Deposit amount must be greater than zero.");
                    return;
                }

                AccountOperations operations = (AccountOperations) account;
                operations.deposit(amount);
                System.out.println("Updated balance: $" + account.balance);
                return;
            }
        }

        System.out.println("Account not found.");
    }

    public static void withdraw(Bank bank, Customer customer) {

        System.out.print("Enter account number: ");
        int enteredAccountNumber = bank.scanner.nextInt();

        System.out.print("Enter withdrawal amount: $");
        double amount = bank.scanner.nextDouble();

        if (amount <= 0) {
            System.out.println("Withdrawal amount must be greater than zero.");
            return;
        }

        for (Account account : customer.accounts) {
            if (account.accountNumber == enteredAccountNumber) {
                AccountOperations operations = (AccountOperations) account;
                operations.withdraw(amount);
                System.out.println("Current balance: $" + account.balance);
                return;
            }
        }

        System.out.println("Account not found.");
    }

    public static void transfer(Bank bank, Customer customer) {

        System.out.print("Enter your source account number: ");
        int sourceNumber = bank.scanner.nextInt();

        System.out.print("Enter destination account number: ");
        int destinationNumber = bank.scanner.nextInt();

        System.out.print("Enter transfer amount: $");
        double amount = bank.scanner.nextDouble();

        if (amount <= 0) {
            System.out.println("Transfer amount must be greater than zero.");
            return;
        }

        Account sourceAccount = null;
        Account destinationAccount = null;

        for (Account account : customer.accounts) {
            if (account.accountNumber == sourceNumber) {
                sourceAccount = account;
                break;
            }
        }

        for (Customer bankCustomer : bank.customers) {
            for (Account account : bankCustomer.accounts) {
                if (account.accountNumber == destinationNumber) {
                    destinationAccount = account;
                    break;
                }
            }
        }

        if (sourceAccount == null || destinationAccount == null) {
            System.out.println("Source or destination account not found.");
            return;
        }

        if (sourceAccount == destinationAccount) {
            System.out.println("You cannot transfer to the same account.");
            return;
        }

        AccountOperations sourceOperations = (AccountOperations) sourceAccount;
        AccountOperations destinationOperations = (AccountOperations) destinationAccount;
        boolean withdrawalSucceeded = sourceOperations.withdraw(amount);

        if (withdrawalSucceeded) {
            destinationOperations.deposit(amount);
            System.out.println("Transfer completed successfully.");
        } else {
            System.out.println("Transfer failed.");
        }
    }
}
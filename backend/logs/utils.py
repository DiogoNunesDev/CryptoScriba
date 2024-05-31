from .models import ActivityLog

def log_activity(user, action, details=None):
    ActivityLog.objects.create(user=user, action=action, details=details)

# User Actions
def log_user_registration(user):
    log_activity(user, 'USER_REGISTRATION', f'User {user.email} registered.')

def log_user_login(user):
    log_activity(user, 'USER_LOGIN', f'User {user.email} logged in.')

def log_user_logout(user):
    log_activity(user, 'USER_LOGOUT', f'User {user.email} logged out.')

def log_password_change(user):
    log_activity(user, 'PASSWORD_CHANGE', f'User {user.email} changed password.')

# Transaction Actions
def log_transaction_creation(user, transaction):
    log_activity(user, 'TRANSACTION_CREATION', f'Transaction {transaction.id} of type {transaction.transaction_type} created.')

# Wallet Actions
def log_wallet_creation(user, wallet):
    log_activity(user, 'WALLET_CREATION', f'Wallet {wallet.identifier} created.')

def log_wallet_update(user, wallet):
    log_activity(user, 'WALLET_UPDATE', f'Wallet {wallet.identifier} updated.')

def log_wallet_deletion(user, wallet_id):
    log_activity(user, 'WALLET_DELETION', f'Wallet {wallet_id} deleted.')

# Coin Actions
def log_coin_addition(user, coin):
    log_activity(user, 'COIN_ADDITION', f'Coin {coin.name} added.')

def log_coin_update(user, coin):
    log_activity(user, 'COIN_UPDATE', f'Coin {coin.name} updated.')

def log_coin_deletion(user, coin_id):
    log_activity(user, 'COIN_DELETION', f'Coin with ID {coin_id} deleted.')

# Administrative Actions
def log_admin_login(user):
    log_activity(user, 'ADMIN_LOGIN', f'Admin {user.email} logged in.')

def log_admin_logout(user):
    log_activity(user, 'ADMIN_LOGOUT', f'Admin {user.email} logged out.')

def log_user_account_deletion(admin, user):
    log_activity(admin, 'USER_ACCOUNT_DELETION', f'Admin {admin.email} deleted user {user.email}.')

# Security Actions
def log_failed_login_attempt(email):
    log_activity(None, 'FAILED_LOGIN_ATTEMPT', f'Failed login attempt for email {email}.')

# System Actions
def log_database_backup(admin):
    log_activity(admin, 'DATABASE_BACKUP', f'Admin {admin.email} performed a database backup.')
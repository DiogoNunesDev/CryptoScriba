import os
from cryptography.fernet import Fernet

def decrypt_backup():
  key_file_path = input('Enter the path to the key file: ')
  encrypted_file_path = input('Enter the path to the encrypted backup file: ')

  
  with open(key_file_path, 'rb') as key_file:
    key = key_file.read()

  fernet = Fernet(key)

  with open(encrypted_file_path, 'rb') as backup_file:
    encrypted_data = backup_file.read()

  #Decrypting the data
  decrypted_data = fernet.decrypt(encrypted_data)

  #Saving the decrypted data to a new file
  decrypted_path = 'db_decrypted.sqlite3'
  with open(decrypted_path, 'wb') as decrypted_file:
    decrypted_file.write(decrypted_data)

  print(f'Database decrypted and saved to {decrypted_path}')

if __name__ == '__main__':
  decrypt_backup()

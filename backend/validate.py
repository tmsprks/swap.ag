import requests
import os


def read_env_variables(file_path):
    variables = {}
    with open(file_path, 'r') as file:
        for line in file:
            key, value = line.strip().split('=', 1)
            variables[key] = value
    return variables


def read_solidity_code(file_path):
    with open(file_path, 'r') as file:
        return file.read()

env_vars = read_env_variables('env_variables.txt')
api_key = env_vars['API_KEY']
contract_address = env_vars['CONTRACT_ADDRESS']
contract_name = env_vars['CONTRACT_NAME']
compiler_version = env_vars['COMPILER_VERSION']
optimization_used = env_vars['OPTIMIZATION_USED']

source_code = read_solidity_code('SwapExecutor.sol')

url = 'https://api.arbiscan.io/api'

# Request body
data = {
    'apikey': api_key,
    'module': 'contract',
    'action': 'verifysourcecode',
    'contractaddress': contract_address,
    'sourceCode': source_code,
    'contractname': contract_name,
    'compilerversion': compiler_version,
    'optimizationUsed': optimization_used,
    'runs': 200,  

}

response = requests.post(url, data=data)

if response.status_code == 200:
    print("Request successful. Check response for submission receipt.")
    print(response.json())
else:
    print("Error in request:", response.status_code)

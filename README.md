## Stack

- [webdriver.io]()
- [chai]()
- [allure]()
- [selenoid]()

## Running Tests

### Preconditions

As a simplification, all instructions are given for Debian-based Linux distros (e.g. Ubuntu). \
Preconditions may be installed in any order. Skip any of the following, if it's already installed:

1. [Install docker-ce](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
2. To assemble and open report after running tests on a local machine, [install allure-cli](https://www.npmjs.com/package/allure-commandline). \
NOTE: `allure-cli` isn't required for CI (at least for Jenkins), so it's not included into the project.
3. Install Node.js
    ```
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get -qq update
    sudo apt-get install nodejs -y
    sudo npm i -g n
    sudo n latest
    ```
4. [Install jq](https://stedolan.github.io/jq/download/)
    ```
    sudo apt-get install jq
    ```

5. [Optional] [Install yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable) (`npm` will do, too)

### Running tests on a local machine

1. Make sure there are no `allure` folders left from the previous run:
    ```
    yarn clean
    ```
2. Setup the test run (pulls all browser docker images listed in browsers.json, then pulls & runs in the background a docker container with selenoid)
    ```
    yarn setup
    ```
3. Run tests
    ```
    yarn test
    ```
4. Assemble and open report
    ```
    yarn report
    ```

## Troubleshooting

1. PROBLEM: Any errors on attempt to assemble allure report \
   SOLUTION: Make sure Java 8+ is installed. Use [`sdkman`](https://sdkman.io/install) to install it, or any other way you prefer.

2. Problem: `yarn setup` fails with "docker permissions" related error \
   Solution: either make sure that `docker` has a permission to run containers without `sudo`:
   ```
   sudo usermod -aG docker $USER
   ```
   or add `sudo` to docker command at `./selenoid_setup.sh` at line 7.
## Available at https://image.org.by/histology/images
### This repository is web client of Slide analysis project. To run this project follow the instructions.
## Instructions:
1. Install os requirements
    ```
    sudo apt-get install git python3 nodejs npm python3-pip openslide-tools libsm6 libxext6 python3-tk
    ```

2. Clone projects
    ```
    git clone https://github.com/Vozf/slide_analysis_web.git
    git clone https://github.com/Vozf/slide_analysis_api.git
    ```
3. Update `slide_analysis_api.slide_analysis_api.constants.py` and set `SLIDE_DIR` to path of your directory with images
4. Run web client
    ```
    cd slide_analysis_web
    npm i
    npm start
    ```
5. Run api
    ```
    cd slide_analysis_api
    pip3 install -r requirements.txt
    python3 run.py
    ```

## Screenshots
![](https://pp.userapi.com/c845324/v845324976/124923/Hwg73qezjGg.jpg)
![](https://pp.userapi.com/c845324/v845324976/12492d/VMQ2b4w-W3c.jpg)

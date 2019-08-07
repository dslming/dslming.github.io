//
//  HOG.cpp
//  cvtest
//
//  Created by dushi on 2019/8/5.
//  Copyright © 2019 lianming. All rights reserved.
//

#include "HOG.hpp"
#include <opencv2/opencv.hpp>
#include <opencv2/objdetect.hpp>
using namespace std;
using namespace cv;

int hog_run(void)
{
    String str = "/Users/dushi/Documents/1097364388.github.com/opencv/src-cpp/cvtest/imgs/hog.png";
    Mat src, dst;
    src = imread(str,1);
    if (src.empty())
    {
        printf("can not load the image...\n");
        return -1;
    }
    dst = src.clone();
    vector<Rect> findrects, findrect;
    HOGDescriptor HOG;
    //SVM分类器
    HOG.setSVMDetector(HOGDescriptor::getDefaultPeopleDetector());

    //多尺度检测
    HOG.detectMultiScale(src, findrects, 0, Size(4,4), Size(0,0), 1.05, 2);

    //若rects有嵌套,则取最外面的矩形存入rect
    for(int i=0; i < findrects.size(); i++)
    {
        Rect rect = findrects[i];
        int j=0;
        for(; j < findrects.size(); j++)
            if(j != i && (rect & findrects[j]) == rect)
                break;
        if( j == findrects.size())
            findrect.push_back(rect);
    }
    //框选出检测结果
    for(int i=0; i<findrect.size(); i++)
    {
        RNG rng(i);
        Scalar color = Scalar(rng.uniform(0,255), rng.uniform(0,255), rng.uniform(0,255));
        rectangle(dst, findrect[i].tl(), findrect[i].br(), color, 2);
    }

    imshow("src",src);
    imshow("dst",dst);
    waitKey();
    return 0;
}

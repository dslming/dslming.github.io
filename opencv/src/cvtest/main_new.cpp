//#include <opencv2/opencv.hpp>
//#include<vector>
//#include <iostream>
//#include <math.h>
//
//
//using namespace cv;
//using namespace std;
//
//Mat src_img, gray_img, dst_img;
//int threshold_value = 100;      // 定义阈值，全局变量
//int max_level = 255;          // 定义最大阈值，全局变量
//const string output_win = "Contours Result";
//const string roi_win = "Final Result";
//void FindROI(int, void*);           //声明函数，用于找到兴趣区域
//void Check_Skew();        //声明函数，用于纠正倾斜
//
//
//int main( )
//{
//    
//    src_img = imread("/Users/dushi/Desktop/456.jpg");
//    if (src_img.empty())
//    {
//        printf("could not load the image...\n");
//        return -1;
//    }
//    namedWindow("original", WINDOW_AUTOSIZE);
//    imshow("original", src_img);
//    Check_Skew();         //纠正倾斜
//    
//    /*
//     src_img = imread("2018.4.25.jpg");
//     if (src_img.empty())
//     {
//     printf("could not load the image...\n");
//     return -1;
//     }
//     namedWindow(output_win, CV_WINDOW_AUTOSIZE);
//     // 接下来提取兴趣区域
//     createTrackbar("Threshold:",output_win, &threshold_value, max_level, FindROI);
//     FindROI(0, 0);
//     */
//    waitKey(0);
//    return 0;
//}
//
//void Check_Skew()
//{
//    Mat canny_output;
//    cvtColor(src_img, gray_img, COLOR_BGR2GRAY);         //将原图转化为灰度图
//    Canny(gray_img, canny_output, threshold_value, threshold_value * 2, 3, false);      // canny边缘检测
//    
//    vector<vector<Point>> contours;
//    vector<Vec4i> hireachy;
//    findContours(canny_output, contours, hireachy, RETR_TREE, CHAIN_APPROX_SIMPLE, Point(0, 0));    // 找到所有轮廓
//    Mat drawImg = Mat::zeros(src_img.size(), CV_8UC3);
//    float max_width = 0;       // 定义最大宽度
//    float max_height = 0;      // 定义最大高度
//    double degree = 0;         // 定义旋转角度
//    for (auto t = 0; t < contours.size(); ++t)            // 遍历每一个轮廓
//    {
//        RotatedRect minRect = minAreaRect(contours[t]);        // 找到每一个轮廓的最小外包旋转矩形，RotatedRect里面包含了中心坐标、尺寸以及旋转角度等信息
//        degree = abs(minRect.angle);
//        if (degree > 0)
//        {
//            max_width = max(max_width, minRect.size.width);
//            max_height = max(max_height, minRect.size.height);
//        }
//    }
//    RNG rng(12345);
//    for (auto t = 0; t < contours.size();++t)
//    {
//        RotatedRect minRect = minAreaRect(contours[t]);
//        if (max_width == minRect.size.width && max_height == minRect.size.height)
//        {
//            degree = minRect.angle;   // 保存目标轮廓的角度
//            Point2f pts[4];
//            minRect.points(pts);
//            Scalar color = Scalar(rng.uniform(0, 255), rng.uniform(0, 255), rng.uniform(0, 255));  //产生随机颜色
//            for (int i = 0; i < 4; ++i)
//            {
//                line(drawImg, pts[i], pts[(i + 1) % 4], color, 2, 8, 0);
//            }
//        }
//    }
//    
//    imshow("find profile", drawImg);
//    Point2f center(src_img.cols / 2, src_img.rows / 2);
//    Mat rotm = getRotationMatrix2D(center, degree, 1.0);    //获取仿射变换矩阵
//    Mat dst;
//    warpAffine(src_img, dst, rotm, src_img.size(), INTER_LINEAR, 0, Scalar(255, 255, 255));    // 进行图像旋转操作
//    imwrite("/Users/dushi/Desktop/123.jpg", dst);      //将校正后的图像保存下来
//    imshow("Correct Image", dst);
//}

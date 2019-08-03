#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include <stdlib.h>
#include <stdio.h>
#include <cmath>
#include <iostream>

using namespace cv;
using namespace std;

int sobel_run_by_API(void) {
    Mat src, src_gray;
    Mat grad;

    int scale = 1;
    int delta = 0;
    int ddepth = CV_16S;
    String str = "./1.jpg";
    src = imread(str);
    if( !src.data )
    {
        return -1;
    }
    imshow("input", src);
    //高斯模糊
    GaussianBlur( src, src, Size(3,3), 0, 0, BORDER_DEFAULT );
    //转成灰度图
    cvtColor( src, src_gray,COLOR_RGB2GRAY );

    namedWindow( "td", WINDOW_AUTOSIZE );

    Mat grad_x, grad_y;
    Mat abs_grad_x, abs_grad_y;
    //x方向梯度计算
    Sobel( src_gray, grad_x, ddepth, 1, 0, 3, scale, delta, BORDER_DEFAULT );
    convertScaleAbs( grad_x, abs_grad_x );
    imshow("X Sobel", abs_grad_x);

    //y方向梯度计算
    Sobel( src_gray, grad_y, ddepth, 0, 1, 3, scale, delta, BORDER_DEFAULT );
    convertScaleAbs( grad_y, abs_grad_y );
    imshow("Y Sobel", abs_grad_y);

    //加权和
    addWeighted( abs_grad_x, 0.5, abs_grad_y, 0.5, 0, grad );

    imshow("td", grad );

    waitKey();
    return 0;
}


bool sobelEdge(Mat&  srcImage, Mat& resultImageX, Mat& resultImageY, uchar threshold) {
    CV_Assert(srcImage.channels() == 1);
    // 初始化水平核因子
    Mat sobelx = (Mat_<double>(3, 3) << -1, 0, 1, -2, 0, 2, -1, 0, 1);
    cout << "sobelx=" << sobelx << endl;

    // 初始化垂直核因子
    Mat sobely = (Mat_<double>(3, 3) << -1, -2, -1, 0, 0, 0, 1, 2, 1);
    cout << "sobely=" << sobelx << endl;

    resultImageX = Mat::zeros(srcImage.rows - 2, srcImage.cols - 2, srcImage.type());
    resultImageY = Mat::zeros(srcImage.rows - 2, srcImage.cols - 2, srcImage.type());

    double edgeX = 0;
    double edgeY = 0;
    double graMagX = 0;// 垂直方向上的梯度模长
    double graMagY = 0;// 水平方向上的梯度模长

    for (int k = 1; k < srcImage.rows - 1; ++k) {
      for (int n = 1; n < srcImage.cols - 1; ++n) {
        edgeX = 0;
        edgeY = 0;
        // 遍历计算水平与垂直梯度
        for (int i = -1; i <= 1; ++i) {
          for (int j = -1; j <= 1; ++j) {
            // 算子x i: -1, 0, 1
            // 算子y j: -1, 0, 1
            // 图片行 k: 1 ~ rows-1
            // 图片列 n: 1 ~ cols-1
            // cout << "("<<k+i<<","<<n+j<<")"<<","<<"("<<1 + i<<","<<1 + j<<")"<<endl;
            edgeX += srcImage.at<uchar>(k + i, n + j) * sobelx.at<double>(1 + i, 1 + j);
            edgeY += srcImage.at<uchar>(k + i, n + j) * sobely.at<double>(1 + i, 1 + j);
          }
        }

        // 计算水平、垂直方向上的梯度模长
        graMagX = sqrt(pow(edgeX, 2));
        graMagY = sqrt(pow(edgeY, 2));

        // 二值化
        resultImageX.at<uchar>(k - 1, n - 1) = ((graMagX > threshold) ? 255 : 0);
        resultImageY.at<uchar>(k - 1, n - 1) = ((graMagY > threshold) ? 255 : 0);
      }
    }
    return true;
}

int OTSU(Mat &srcImage) {
    int nRows = srcImage.rows;
    int nCols = srcImage.cols;

    int threshold = 0;
    double max = 0.0;
    double AvePix[256];
    int nSumPix[256];
    double nProDis[256];
    double nSumProDis[256];



    for (int i = 0; i < 256; i++)
    {
        AvePix[i] = 0.0;
        nSumPix[i] = 0;
        nProDis[i] = 0.0;
        nSumProDis[i] = 0.0;
    }


    for (int i = 0; i < nRows; i++)
    {
        for (int j = 0; j < nCols; j++)
        {
            nSumPix[(int)srcImage.at<uchar>(i, j)]++;
        }
    }


    for (int i = 0; i < 256; i++)
    {
        nProDis[i] = (double)nSumPix[i] / (nRows*nCols);

    }


    AvePix[0] = 0;
    nSumProDis[0] = nProDis[0];


    for (int i = 1; i < 256; i++)
    {
        nSumProDis[i] = nSumProDis[i - 1] + nProDis[i];
        AvePix[i] = AvePix[i - 1] + i*nProDis[i];
    }

    double mean = AvePix[255];


    for (int k = 1; k < 256; k++)
    {
        double PA = nSumProDis[k];
        double PB = 1 - nSumProDis[k];
        double value = 0.0;
        if (fabs(PA) > 0.001 && fabs(PB) > 0.001)
        {
            double MA = AvePix[k];//前一半的平均
            double MB = (mean - PA*MA) / PB;//后一半的平均
            value = value = (double)(PA * PB * pow((MA - MB), 2));//类间方差
            //或者这样value = (double)(PA * PB * pow((MA-MB),2));//类间方差
            //pow(PA,1)* pow((MA - mean),2) + pow(PB,1)* pow((MB - mean),2)
            if (value > max)
            {
                max = value;
                threshold = k;
            }
        }
    }
    return threshold;
}


int sobel_run_by_myself(void) {
    String str = "/Users/dushi/Desktop/1.png";
    Mat srcImage = imread(str);
    if (!srcImage.data) {
        printf("img read fail...\r\n");
        return -1;
    }
    Mat srcGray;
    cvtColor(srcImage, srcGray, COLOR_BGR2GRAY);
    // imshow("srcGray", srcGray);

    //调用二值化函数得到最佳阈值
    int otsuThreshold = OTSU(srcGray);
    printf("otsuThreshold = %d \r\n",otsuThreshold);
    Mat XresultImage;
    Mat YresultImage;
    sobelEdge(srcGray, XresultImage, YresultImage, otsuThreshold);
    Mat resultImage;
    //水平垂直边缘叠加
    addWeighted(XresultImage, 0.5, YresultImage, 0.5, 0.0, resultImage);
    imshow("resx", XresultImage);
    imshow("resy", YresultImage);
    imshow("res", resultImage);
    waitKey(0);
    return 0;
}

#include <opencv2/core/core.hpp>
#include<opencv2/highgui/highgui.hpp>
#include <iostream>
#include <sstream>
//#include "kernel.h"

using namespace std;
using namespace cv;

void Sharpen(const Mat& myImage, Mat& Result)
{
    CV_Assert(myImage.depth() == CV_8U);  // accept only uchar images,这里确保我们接受的图片的格式
    
    Result.create(myImage.size(), myImage.type()); //依据myImage的size和type来创建矩阵。
    const int nChannels = myImage.channels();//获取图片的channel
    
    for (int j = 1; j < myImage.rows - 1; ++j)
    {
        const uchar* previous = myImage.ptr<uchar>(j - 1);//获取i，j位置上i行，i-1行和i+1行，
        const uchar* current = myImage.ptr<uchar>(j);
        const uchar* next = myImage.ptr<uchar>(j + 1);
        
        uchar*output = Result.ptr<uchar>(j);
        
        for (int i = nChannels; i < nChannels * (myImage.cols - 1); ++i)
        {
            *output++ = saturate_cast<uchar>(5 * current[i]
                                             - current[i - nChannels] - current[i + nChannels] - previous[i] - next[i]);//这里依据公式计算，之所以是i-nChannels是由于矩阵的存储格式，
            //  详细看这里http://blog.csdn.net/zhonghuan1992/article/details/38408939
        }
    }
    
    //对于图像的边界部分，上面的公式并不作用于这里，在这样的情况下，能够把边界值都设为0
    Result.row(0).setTo(Scalar(0));
    Result.row(Result.rows - 1).setTo(Scalar(0));
    Result.col(0).setTo(Scalar(0));
    Result.col(Result.cols - 1).setTo(Scalar(0));
}

int run(void)
{
    String str = "/Users/dushi/Desktop/456.jpg";
    Mat I, J;
    //I = imread(argv[1], CV_LOAD_IMAGE_GRAYSCALE);
    I = imread(str);
    
    Sharpen(I, J);
    imshow("result", J);
    waitKey();
    
    return 0;
}

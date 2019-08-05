//#include <opencv2/opencv.hpp>
//using namespace cv;
//using namespace std;
//
//void callback(int, void*);
//int value = 40;
//Mat src, gray,canny_img;
//
//int main(int arc, char** argv) {
//    src = imread("/Users/dushi/Desktop/456.jpg");
//    namedWindow("input", WINDOW_AUTOSIZE);
//    imshow("input", src);
//
//    namedWindow("output", WINDOW_AUTOSIZE);
//    createTrackbar("threshold", "output", &value, 2 * value, callback);
//    callback(0, 0);
//    waitKey(0);
//    return 0;
//}
//
//void callback(int, void*) {
//    // 边缘检测
//    cvtColor(src, gray, COLOR_BGR2GRAY);
//    Canny(gray, canny_img, value, 2 * value, 3);
//    imshow("output", canny_img);
//
//    //寻找轮廓
//    vector <vector<Point>>contours;
//    vector<Vec4i>hierarchy;
//    findContours(canny_img, contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE, Point(0, 0));
//    //筛选轮廓
//    int minW = src.cols*0.5;
//    int minH = src.rows*0.5;
//    Mat draw = Mat::zeros(src.size(), CV_8UC3);
//    Mat dst;
//    for (int i = 0; i < contours.size(); i++) {
//        //寻找轮廓带方向的最小外接矩形（带方向即最小面积矩形）
//        RotatedRect minRect = minAreaRect(contours[i]);
//        if (minRect.size.width > minW && minRect.size.height > minH && minRect.size.width < (src.cols - 5)) {
//            //画出带方向的矩形
//            Point2f pts[4];
//            minRect.points(pts);
//            for (int j = 0; j < 4; j++) {
//                line(draw, pts[j], pts[(j + 1) % 4], Scalar(0, 255, 0), 2);
//            }
//            imshow("output2", draw);
//            //旋转变换
//            float degree = minRect.angle;
//            Point2f center = minRect.center;
//            Mat rotm = getRotationMatrix2D(center, degree, 1.0); //获取旋转矩阵
//
//            warpAffine(src, dst, rotm, src.size(), INTER_LINEAR, 0, Scalar(255, 255, 255));// 进行图像旋转
//            imshow("output3", dst);
//        }
//    }
//    //切边
//    Mat gray, binary;
//    cvtColor(dst, gray, COLOR_BGR2GRAY);
//    threshold(gray, binary, 60, 255, THRESH_BINARY|THRESH_OTSU );
//    vector <vector<Point>>contours2;
//    vector<Vec4i>hierarchy2;
//    Mat draw2 = Mat::zeros(src.size(), CV_8UC3);
//    findContours(binary, contours2, hierarchy2, RETR_TREE, CHAIN_APPROX_SIMPLE, Point(0, 0));
//    for (int j = 0; j < contours2.size(); j++) {
//        Rect box = boundingRect(contours2[j]);
//        if (box.width > dst.cols*0.3 && box.height > dst.rows*0.3 && box.width<(src.cols-5)) {
//            rectangle(draw2, box, Scalar(0,255, 255), 2);
//            imshow("output4", draw2);
//            Mat result_img = dst(box);
//
//            Mat dst_resize;
//            resize(result_img, dst_resize, Size(), 2, 2);//我长宽都变为原来的0.5倍
//            imshow("output5", dst_resize);
//        }
//    }
//
//}

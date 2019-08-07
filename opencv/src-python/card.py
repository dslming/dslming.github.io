import os
import numpy as np
from keras.models import Sequential
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import Conv2D, MaxPooling2D, ZeroPadding2D
from keras import optimizers
import keras

input_shape = (32, 32, 3)
img_width = 32
img_height = 32
num_classes = 10
nb_train_samples = 10000
nb_validation_samples = 2000
batch_size = 16
epochs = 1

train_data_dir = './credit_card/train'
validation_data_dir = './credit_card/test'


validation_datagen = ImageDataGenerator(
    rescale = 1./255)

train_datagen = ImageDataGenerator(
      rescale = 1./255,                   rotation_range = 10,
      width_shift_range = 0.25,
      height_shift_range = 0.25,
      shear_range=0.5,
      zoom_range=0.5,
      horizontal_flip = False,
      fill_mode = 'nearest')

train_generator = train_datagen.flow_from_directory(
        train_data_dir,
        target_size = (img_width, img_height),
        batch_size = batch_size,
        class_mode = 'categorical')

validation_generator = validation_datagen.flow_from_directory(
        validation_data_dir,
        target_size = (img_width, img_height),
        batch_size = batch_size,
        class_mode = 'categorical',
        shuffle = False)




l = Sequential()

l.add(Conv2D(20, (5, 5),
                         padding = "same",
                         input_shape = input_shape))
        model.add(Activation("relu"))
        model.add(MaxPooling2D(pool_size = (2, 2), strides = (2, 2)))

        model.add(Conv2D(50, (5, 5),
                         padding = "same"))
        model.add(Activation("relu"))
        model.add(MaxPooling2D(pool_size = (2, 2), strides = (2, 2)))

        model.add(Flatten())
        model.add(Dense(500))
        model.add(Activation("relu"))

        model.add(Dense(num_classes))
        model.add(Activation("softmax"))

        model.compile(loss = 'categorical_crossentropy',
                      optimizer = keras.optimizers.Adadelta(),
                      metrics = ['accuracy'])

        print(model.summary())




        from keras.optimizers import RMSprop
      from keras.callbacks import ModelCheckpoint, EarlyStopping

      checkpoint = ModelCheckpoint("/home/deeplearningcv/DeepLearningCV/Trained Models/creditcard.h5",
                                   monitor="val_loss",
                                   mode="min",
                                   save_best_only = True,
                                   verbose=1)

      earlystop = EarlyStopping(monitor = 'val_loss',
                                min_delta = 0,
                                patience = 3,
                                verbose = 1,
                                restore_best_weights = True)

llbacks = [earlystop, checkpoint]

del.compile(loss = 'categorical_crossentropy',
                    optimizer = RMSprop(lr = 0.001),
                    metrics = ['accuracy'])

      nb_train_samples = 20000
      nb_validation_samples = 4000
      epochs = 5
      batch_size = 16

      history = model.fit_generator(
          train_generator,
          steps_per_epoch = nb_train_samples // batch_size,
          epochs = epochs,
          callbacks = callbacks,
          validation_data = validation_generator,
          validation_steps = nb_validation_samples // batch_size)

      model.save("/home/deeplearningcv/DeepLearningCV/Trained Models/creditcard.h5")




      from keras.models import load_model

      classifier = load_model('/home/deeplearningcv/DeepLearningCV/Trained Models/creditcard.h5')


      import cv2
    from keras.preprocessing import image

    def pre_process(image, inv = False):
        try:
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        except:
            gray_image = image
            pass

        kernel = np.ones((3,3), np.uint8)

        if inv == False:
            _, th2 = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        else:
            _, th2 = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
sized = cv2.resize(th2, (32,32), interpolation = cv2.INTER_AREA)
        return resized

    image = cv2.imread('credit_card.jpg')
    resized = cv2.resize(image, (640,403), interpolation = cv2.INTER_AREA)

    ROI = ([(66, 220), (92, 262)], [(92, 12), (295, 25)])
    region = ROI[0]

    top_left_y = region[0][1]
    bottom_right_y = region[1][1]
    top_left_x = region[0][0]
    bottom_right_x = region[1][0]

    for i in range(0,16):
        if i > 0 and i%4  == 0:
            jump = 30
        else:
            jump = 0

        if i > 0:
            top_left_x = top_left_x + 26 + jump
            bottom_right_x = bottom_right_x + 26 + jump

        roi = resized[top_left_y:bottom_right_y, top_left_x:bottom_right_x]
        roi_otsu = pre_process(roi)
        cv2.imshow("roi", roi)
        cv2.imshow("roi_otsu", roi_otsu)
        roi_otsu = cv2.cvtColor(roi_otsu, cv2.COLOR_GRAY2RGB)
        x = keras.preprocessing.image.img_to_array(roi_otsu)
        x = x * 1./255
        x = np.expand_dims(x, axis=0)
        image = np.vstack([x])
        label = classifier.predict_classes(image, batch_size = 10)
        print(label)
        cv2.waitKey(0)

    cv2.destroyAllWindows()




    cv2.destroyAllWindows()



    def pre_process(image, inv = False):
    try:
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    except:
        gray_image = image
        pass

    kernel = np.ones((3,3), np.uint8)

    if inv == False:
        _, th2 = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    else:
        _, th2 = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    dilation = cv2.dilate(th2, kernel, iterations = 1)
    resized = cv2.resize(th2, (32,32), interpolation = cv2.INTER_AREA)
    return resized

def x_cord_contour(contour):
= cv2.moments(contour)
    return (int(M['m10']/M['m00']))




    img = cv2.imread('card_numbers.jpg')
orig_img = cv2.imread('credit_card_color.jpg')
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
cv2.imshow("image", img)
cv2.waitKey(0)

urred = cv2.GaussianBlur(gray, (5, 5), 0)
cv2.imshow("blurred", blurred)
cv2.waitKey(0)

edged = cv2.Canny(blurred, 30, 150)
cv2.imshow("edged", edged)
cv2.waitKey(0)

, contours, _ = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

ontours = sorted(contours, key = x_cord_contour, reverse = False)

ull_number = []

for c in contours:
    (x, y, w, h) = cv2.boundingRect(c)

    if w >= 5 and h >= 25:
        roi = blurred[y:y + h, x:x + w]
        ret, roi = cv2.threshold(roi, 20, 255,cv2.THRESH_BINARY_INV)
        cv2.imshow("ROI1", roi)
        roi_otsu = pre_process(roi, True)
        cv2.imshow("ROI2", roi_otsu)
        roi_otsu = cv2.cvtColor(roi_otsu, cv2.COLOR_GRAY2RGB)
        roi_otsu = keras.preprocessing.image.img_to_array(roi_otsu)
        roi_otsu = roi_otsu * 1./255
        roi_otsu = np.expand_dims(roi_otsu, axis=0)
        image = np.vstack([roi_otsu])
        label = str(classifier.predict_classes(image, batch_size = 10))
        print(label)
        cv2.rectangle(orig_img, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(orig_img, label, (x , y + 155), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 1)
        cv2.imshow("image", orig_img)
        cv2.waitKey(0)

cv2.destroyAllWindows()

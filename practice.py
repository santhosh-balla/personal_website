nums = [0,1]

from typing import List

def findMaxLength(nums: List[int]) -> int:

    count1 = 0

    count0 = 0

    gapList = [None] * len(nums) 


    for i, x in enumerate(nums):
        if x == 0:
            count0 +=1

        if x == 1:
            count1 +=1 
        
        gapList[i] = (count1 - count0)
    
    
    for i in range(len(gapList) -1, -1, -1):
        for j in range(0, len(gapList)):
            if j < i and gapList[i] == gapList[j]:
                return gapList, i - j
            

print(findMaxLength(nums))

    




